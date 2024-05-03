/* eslint-disable @next/next/no-img-element */
"use client";

import { useSelectedEmoji } from "@/components/emoji-picker/emoji-picker";
import PostHeaderComponent from "@/components/post/components/post-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import useCreatePost from "@/hooks/useCreatePost";
import useGetPostByID from "@/hooks/useGetPostByID";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import useSharePost from "@/hooks/useSharePost";
import { formatDistanceToNow } from "date-fns";
import { Earth, Users, Lock, X, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  trigger: React.ReactNode;
  id?: number;
  contents: {
    id: number;
    content: string;
    post_image: any;
    created_at: string;
    post_type: string;
    user: {
      id: any;
      first_name: string;
      last_name: string;
      profile_picture: string;
    };
  };
};

export default function SharePostModal({ trigger, id, contents }: Props) {
  const { profile } = useGetProfileByUser();
  const [post_type, setPostType] = useState("PUBLIC");
  const [privacy, setPrivacy] = useState("Public");
  const [images, setImages] = useState([] as string[]);
  const [postImage, setPostImage] = useState([] as string[]);
  const [postImages, setPostImages] = useState([] as File[]);
  const { createPost, createPostLoading } = useCreatePost();
  const { toast } = useToast();
  const { selectedEmoji } = useSelectedEmoji();
  const [modalClose, setModalClose] = useState(false);

  const { createSharePost } = useSharePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onPostSubmit = (data: any) => {
    // console.log("POST DATA", data);
    createSharePost(
      {
        id: contents.id,
        share_content: data.content
      },
      {
        onSuccess: () => {
          reset();
          setImages([]);
          setPostImages([]);
          toast({
            title: "Post Shared",
            description: "Post has been shared successfully",
            variant: "default"
          });
          setModalClose(true);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    );
  };

  const handlePrivacy = (value: string) => {
    setPrivacy(value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const validFiles: File[] = [];
      const invalidFiles: File[] = [];

      // Check file sizes
      Array.from(files).forEach((file) => {
        if (file.size <= 2 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      });

      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid File",
          description: "File size should be less than 2MB",
          variant: "destructive"
        });
      }

      if (validFiles.length === 1) {
        const url = URL.createObjectURL(validFiles[0]);
        setImages([url]);
        console.log("VALID FILES", validFiles);
        setPostImages(validFiles);
      } else {
        const urls = validFiles.map((file) => URL.createObjectURL(file));
        setPostImages(validFiles);
        console.log("VALID FILES", validFiles);
        setImages(urls);
        console.log(urls);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  useEffect(() => {
    if (contents?.post_image) {
      const images = JSON.parse(contents?.post_image);
      setPostImage(images);
    }
  }, [contents]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setModalClose(false);
        }
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="w-[700px] bg-white dark:bg-dark-surface rounded-lg ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold leading-none tracking-tight text-center">
            Share Post
          </DialogTitle>
        </DialogHeader>
        <hr className="my-2 border-gray-500" />

        <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <Avatar className="w-14 h-14 rounded-full">
            <AvatarImage
              src={profile?.profile_picture ?? "/images/profile.jpg"}
              alt="profile"
            />
            <AvatarFallback>
              {profile?.first_name[0] + profile?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">
              {profile?.first_name} {profile?.last_name}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-2 items-center text-gray-600 border border-gray-600 rounded-lg p-1">
                  {post_type === "PUBLIC" ? (
                    <Earth size={16} className="text-xs" />
                  ) : post_type === "FRIENDS" ? (
                    <Users size={16} className="text-xs" />
                  ) : (
                    <Lock size={16} className="text-xs" />
                  )}

                  <p className="text-xs">
                    {post_type === "PUBLIC"
                      ? "Public"
                      : post_type === "FRIENDS"
                      ? "Friends"
                      : "Only Me"}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setPostType("PUBLIC")}
                  className={`${
                    post_type === "PUBLIC" ? "bg-gray-200" : ""
                  } hover:bg-gray-200`}
                >
                  <div className="flex gap-2 items-center">
                    <Earth size={16} className="text-xs" />
                    <p className="text-xs">Public</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPostType("FRIENDS")}
                  className={`${
                    post_type === "FRIENDS" ? "bg-gray-200" : ""
                  } hover:bg-gray-200`}
                >
                  <div className="flex gap-2 items-center">
                    <Users size={16} className="text-xs" />
                    <p className="text-xs">Friends</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setPostType("ONLY_ME")}
                  className={`${
                    post_type === "ONLY_ME" ? "bg-gray-200" : ""
                  } hover:bg-gray-200`}
                >
                  <div className="flex gap-2 items-center">
                    <Lock size={16} className="text-xs" />
                    <p className="text-xs">Only Me</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <form
          className="block w-full relative"
          onSubmit={handleSubmit(onPostSubmit)}
        >
          <Textarea
            placeholder="What's on your mind?"
            className="w-full border-non  my-2 resize-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-2">
              Please enter your post content
            </p>
          )}
          {images.length > 0 && (
            <div className="flex gap-2 mt-2 relative">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <X
                    size={20}
                    className="absolute top-1 right-1 cursor-pointer text-white bg-blue-600 rounded-full p-1"
                    onClick={() => removeImage(index)}
                  />
                  <img
                    src={image}
                    alt="Post Image"
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
          <ScrollArea className="w-full h-[200px]">
            <div className="p-4 border border-gray-900 rounded-lg">
              {contents && (
                <>
                  <PostHeaderComponent
                    profile_picture={
                      contents?.user?.profile_picture ?? "/images/profile.jpg"
                    }
                    first_name={contents?.user?.first_name ?? ""}
                    last_name={contents?.user?.last_name ?? ""}
                    timestamp={formatDistanceToNow(contents?.created_at, {
                      addSuffix: true
                    })}
                    post_type={contents?.post_type ?? ""}
                  />
                  <p className="text-sm mt-5">{contents?.content}</p>
                  {postImage?.length! > 0 &&
                    postImage?.map((image, index) => {
                      if (postImage?.length! > 2 && postImage?.length! < 4) {
                        if (index === 0) {
                          return (
                            <img
                              key={index}
                              src={image}
                              alt="post"
                              className="w-full col-span-2 object-cover rounded-lg"
                            />
                          );
                        } else {
                          return (
                            <img
                              key={index}
                              src={image}
                              alt="post"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          );
                        }
                      } else {
                        return (
                          <img
                            key={index}
                            src={image}
                            alt="post"
                            className="w-full h-96 object-cover rounded-lg"
                          />
                        );
                      }
                    })}
                </>
              )}
            </div>
          </ScrollArea>
          <hr className="my-2" />
          <div className="flex flex-col w-full gap-2 items-center">
            <label
              htmlFor="photo"
              className="w-full hidden justify-center gap-2 border-2 border-gray-400 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
            >
              <Camera size={20} className="text-green-500" />
              <p className="text-sm">Photo/Video</p>
            </label>
            <input
              type="file"
              name=""
              id="photo"
              className="hidden"
              onChange={handleImage}
              accept="image/*"
              multiple
            />
            <button
              className="bg-blue-500 text-white px-8 py-2 rounded-lg w-full text-center"
              type="submit"
            >
              Share
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
