"use client";

/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/navbar/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { db, storage } from "@/firebase/firebase.config";
import useGetFriendLists from "@/hooks/useGetFriendLists";
import { Message, MessageClass } from "@/types/message.";
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  File,
  ImagePlus,
  MailQuestion,
  Plane,
  Send,
  Trash2
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function Messages({}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const params = useSearchParams();
  const [noMessages, setNoMessages] = React.useState(true);
  const { friends, isLoading } = useGetFriendLists();
  const [sendImages, setSendImages] = React.useState<File[]>([]);
  const [message, setMessage] = React.useState("");
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = React.useState([] as any);
  const [uploadProgress, setUploadProgress] = React.useState<number[]>([]);
  const [showFriends, setShowFriends] = React.useState(true);

  const friendId = params.get("friend");

  const createChat = async () => {
    if (friendId !== undefined && friendId !== null) {
      const data = {
        sender: session?.user?.email,
        receiver: friendId
      };

      const messageDoc = collection(db, "chat");

      const q = query(
        messageDoc,
        where("sender", "==", session?.user?.email),
        where("receiver", "==", friendId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const docRef = await addDoc(messageDoc, data);

        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("Document already exists");
      }
    } else {
      toast({
        title: "Error",
        description: "Please select a friend to chat with",
        variant: "destructive"
      });
    }
    // const docRef = addDoc(messageDoc, data);
  };

  const sendMessage = async () => {
    const messageData = {
      sender: session?.user?.email,
      receiver: friendId,
      timestamp: new Date().toISOString()
    };
    const messageDoc = collection(db, "messages");

    if (message !== "" || sendImages.length !== 0) {
      if (message !== "") {
        const textMessage = {
          text: message,
          user: session?.user?.email,
          images: []
        };

        const docRef = await addDoc(messageDoc, {
          ...messageData,
          message: textMessage
        });
        console.log("Document written with ID: ", docRef.id);
        setMessage(""); // Clear the message input after sending
      }

      if (sendImages.length !== 0) {
        const images = [] as string[];

        const imagePromises = sendImages.map((img) => {
          return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = async () => {
              const storageRef = ref(storage, `chat_images/${img.name}`);
              const metadata = {
                contentType: img.type
              };

              const uploadTask = uploadBytesResumable(
                storageRef,
                img,
                metadata
              );

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  setUploadProgress((prev) => [...prev, progress]);
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image: ", error);
                  reject(error);
                },
                async () => {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  images.push(downloadURL);
                  resolve();
                }
              );
            };
          });
        });

        await Promise.all(imagePromises);

        if (images.length > 0) {
          const imageMessage = {
            text: "", // Empty text for image message
            user: session?.user?.email,
            images: images
          };

          const docRef = await addDoc(messageDoc, {
            ...messageData,
            message: imageMessage
          });
          console.log("Document written with ID: ", docRef.id);
          setSendImages([]); // Clear the sendImages array after sending
        }
      }
    } else {
      toast({
        title: "Message is empty",
        description: "Please type a message or select an image",
        variant: "destructive",
        duration: 5000
      });
    }
  };

  const handleSendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles: File[] = [];

      files.forEach((file) => {
        if (file.size <= 5 * 1024 * 1024) {
          // 5MB in bytes
          validFiles.push(file);
        } else {
          toast({
            title: "Image too large",
            description: "Please upload an image less than 5MB",
            variant: "destructive",
            duration: 5000
          });
        }
      });

      setSendImages(validFiles);
    }
  };

  useEffect(() => {
    // fetch messages from firebase
    const messageDoc = collection(db, "messages");

    const q = query(
      messageDoc,
      where("sender", "==", session?.user?.email),
      where("receiver", "==", friendId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: any = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      setChatMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [friendId, session?.user?.email]);

  useEffect(() => {
    console.log(session);
    console.log("FRIEND ID: ", friendId);
    if (noMessages && friendId === null) {
      console.log("No messages");
    }

    console.log("MESSAGE CHAT: ", chatMessages);
  }, [chatMessages, friendId, noMessages, session, params]);

  return (
    <div className="w-full bg-[#EDEDED] h-[100vh]">
      <Navbar />
      <div className="p-4 rounded-lg bg-white my-2 xl:m-4 h-[87%]">
        <h1 className="text-lg xl:text-2xl font-bold ">Messages</h1>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 mt-6 divide-x-2 h-[90%]">
          {showFriends && !params.get("friend") && (
            <div className="col-span-1 space-y-2">
              {!isLoading &&
                friends?.results?.map((fr: any) => {
                  return (
                    <div
                      key={fr.id}
                      className="flex gap-2 p-2 hover:bg-gray-300 rounded-lg cursor-pointer items-center"
                      onClick={() => {
                        setNoMessages(false);
                        createChat();
                        router.push(`/messages?friend=${fr.friend.id}`);
                        if (typeof window !== "undefined") {
                          if (window.innerWidth < 425) setShowFriends(false);
                        }
                      }}
                    >
                      <img
                        src={fr.friend.profile_picture ?? "/images/default.png"}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-xs xl:text-xl font-medium">
                        <div>
                          {fr.friend.first_name} {fr.friend.last_name}
                        </div>
                        {/* <div className="text-gray-500 text-xs">Active 3m ago</div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          <div className="col-span-4 h-full">
            {noMessages && (friendId === undefined || friendId === null) ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-gray-400 text-2xl text-center">
                  Select a chat to start messaging
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                {!showFriends && params?.get("friend") && (
                  <div
                    className="block lg:hidden text-gray-400 text-sm mb-5 cursor-pointer text-center"
                    onClick={() => {
                      const newParams = new URLSearchParams();
                      newParams.delete("friend");
                      router.push(`/messages?${newParams.toString()}`);
                      setShowFriends(!showFriends);
                    }}
                  >
                    Show Friends
                  </div>
                )}
                <div className="h-full flex flex-col w-full p-1 xl:px-10">
                  <div className="flex-1 border-t border-gray-200 no-scrollbar max-h-[87%] overflow-y-auto flex flex-col">
                    {(friendId !== undefined || friendId !== null) &&
                      chatMessages?.length !== 0 &&
                      chatMessages?.map((msg: any, index: number) => {
                        if (msg.message?.user === session?.user?.email) {
                          return (
                            <div
                              key={index}
                              className="flex gap-2 mt-2 ml-auto flex-row-reverse"
                            >
                              {msg.message?.text !== "" && (
                                <div className=" p-3 rounded-lg  bg-blue-600 text-white">
                                  <p className="text-sm">{msg.message?.text}</p>
                                </div>
                              )}

                              {msg.message?.images.length !== 0 && (
                                <div className="flex gap-2 mt-2 p-3 rounded-lg bg-blue-600">
                                  {msg.message?.images.map(
                                    (img: string, index: number) => {
                                      return (
                                        <div key={index}>
                                          <img
                                            key={index}
                                            src={img}
                                            alt="image"
                                            className="w-60 h-60 rounded-lg"
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <div key={index} className="flex gap-2 mt-2">
                              <Avatar>
                                <AvatarFallback className="bg-blue-500 text-white">
                                  <p>U</p>
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-200 p-2 rounded-lg ">
                                <p className="text-sm">{msg.text}</p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    {(friendId !== undefined || friendId !== null) &&
                      chatMessages?.length === 0 && (
                        <div className="flex justify-center items-center h-full text-center">
                          <div className="text-gray-400 text-2xl text-center flex flex-col items-center gap-2">
                            <MailQuestion
                              size={120}
                              className="text-gray-400 "
                            />
                            <p> No messages yet</p>
                          </div>
                        </div>
                      )}
                  </div>
                  {(friendId !== undefined || friendId !== null) &&
                    sendImages.length !== 0 && (
                      <div className="flex gap-2 mt-2 relative bg-gray-200 p-2 rounded-lg">
                        {sendImages.map((img, index) => {
                          return (
                            <div key={index} className="flex flex-col gap-2">
                              <img
                                src={URL.createObjectURL(img)}
                                alt="image"
                                className="w-20 h-20 rounded-lg"
                              />
                              <Progress value={uploadProgress[index]} />
                            </div>
                          );
                        })}

                        <button
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg flex items-center gap-2"
                          onClick={() => setSendImages([])}
                        >
                          <Trash2 size={20} />
                          Remove All
                        </button>
                      </div>
                    )}
                  <div className="flex gap-2 mt-2 relative">
                    <input
                      type="text"
                      placeholder="Type a message"
                      className="flex-1 border border-gray-300 rounded-lg p-2 text-xs md:text-md"
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <label
                      htmlFor="upload_image"
                      className="bg-blue-500 text-white px-5 py-2 rounded-lg text-center"
                    >
                      <ImagePlus className="inline-block w-4 h-4 lg:w-6 lg:h-6" />
                    </label>
                    <input
                      type="file"
                      id="upload_image"
                      multiple
                      hidden
                      onChange={handleSendImage}
                      accept="image/*"
                    />

                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      onClick={sendMessage}
                    >
                      <Send className="w-4 h-4 lg:w-6 lg:h-6" />
                      <span className='hidden sm:inline-block" text-xs font-medium'>
                        Send
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
