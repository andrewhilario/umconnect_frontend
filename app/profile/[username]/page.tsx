"use client";
/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/navbar/navbar";
import {
  Ban,
  Check,
  EllipsisVertical,
  ImagePlus,
  Pencil,
  Plus,
  SlidersHorizontal,
  Video
} from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Post from "@/components/post/post";
import EditProfileModal from "@/components/profile/modal/edit-profile-modal";
import { useParams } from "next/navigation";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { useSession } from "next-auth/react";
import useGetPostByUser from "@/hooks/useGetPostByUser";
import { UsersPosts } from "@/types/users-post";
import CreatePostOnProfileModal from "@/components/profile/modal/create-post-on-profile-modal";

import { useQuery } from "@tanstack/react-query";
import {
  Baby,
  Component,
  CupSoda,
  Dog,
  Flag,
  Loader2,
  Medal,
  Plane,
  Shirt,
  Smile,
  SmileIcon,
  TrafficCone,
  User
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetAllEmoji from "@/components/emoji-picker/hooks/useGetAllEmoji";
import useGetEmojiCategory from "@/components/emoji-picker/hooks/useGetEmojiCategory";
import useGetEmojiInCategory from "@/components/emoji-picker/hooks/useGetEmojiInCategory";
import { items } from "@/components/emoji-picker/constants/emoji-category";
import useViewProfileByUsername from "@/hooks/useViewProfileByUsername";
import { Skeleton } from "@/components/ui/skeleton";
import useSendFriendRequest from "@/hooks/useSendFriendRequest";
import useGetAllFriendRequests from "@/hooks/useGetAllFriendRequests";
import useRemoveFriendRequest from "@/hooks/useRemoveFriendRequest";

const iconComponents: { [key: string]: React.ComponentType<any> } = {
  Smile,
  User,
  Dog,
  CupSoda,
  Plane,
  Medal,
  Shirt,
  TrafficCone,
  Flag
};

type Props = {
  selectedEmoji?: string;
};

export default function ProfilePageById() {
  const { data: session } = useSession();
  const { selectedEmoji, setSelectedEmoji } = useSelectedEmoji();
  const { profile, profileLoading, profileError } = useViewProfileByUsername();
  const { userPosts, userPostsError, userPostsLoading } = useGetPostByUser();
  const { sendFriendRequest, sendFriendReqLoading } = useSendFriendRequest();
  const { friendRequests, friendRequestLoading, error } =
    useGetAllFriendRequests();
  const { removeFriendRequest, removeFriendReqLoading } =
    useRemoveFriendRequest();

  useEffect(() => {
    console.log("USER POSTS: ", userPosts);
    console.log("PROFILE: ", profile);
  }, [profile, session?.user?.email, session?.user.id, userPosts]);

  if (profileLoading) {
    return (
      <div className="w-full bg-[#EDEDED] min-h-screen">
        <Navbar />
        <div className="w-full bg-white pb-60">
          <div className="w-[70%] mx-auto ">
            <Skeleton className="w-full h-[400px] rounded-b-2xl bg-gray-400" />
            <div className="ml-26 mt-5 flex justify-between items-center">
              <div className="">
                <Skeleton className="w-32 h-32 2xl:w-40 2xl:h-40 rounded-full bg-gray-400" />
              </div>
              <div className="flex gap-2">
                <Skeleton className=" w-52 h-10 text-white rounded-md flex justify-center gap-2 items-center bg-gray-400" />
              </div>
            </div>
            <div className="flex gap-10 items-center mx-auto mt-32">
              <Skeleton className="w-1/2 h-10 text-white rounded-md flex justify-center gap-2 items-center bg-gray-400" />
              <Skeleton className="w-1/2 h-10 text-white rounded-md flex justify-center gap-2 items-center bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EDEDED] min-h-screen">
      <Navbar />
      <div className="w-full bg-white pb-60">
        <div className="w-[70%] mx-auto ">
          {/* Cover Photo */}
          <div className="relative w-full 2xl:h-[400px] rounded-b-2xl">
            <img
              src={profile?.cover_photo ?? "/images/cover.png"}
              alt="cover"
              className="w-full h-full object-cover rounded-b-2xl"
            />

            {/* Profile Picture */}
            <div className="absolute -bottom-12 left-10 2xl:-bottom-32 2xl:left-18">
              <img
                src={profile?.profile_picture ?? "/images/default.png"}
                alt="profile"
                className="w-32 h-32 2xl:w-40 2xl:h-40 rounded-full object-cover border-4 border-blue-400"
              />
            </div>
            {/* Details */}
            <div className="ml-56 mt-5 flex justify-between items-center">
              <div className="">
                <h1 className="text-4xl font-bold text-[#232b2b]">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                {/* <p className="text-lg mt-2 text-[#232b2b]">Web Developer</p> */}
              </div>
              {}
              {session?.user?.email === profile?.email ? (
                <div className="flex gap-2">
                  {/* Add Story and Edit Profile button */}
                  <button className="bg-blue-500 px-4 py-2 text-white rounded-md flex justify-center gap-2 items-center">
                    <Plus size={16} className="text-white" />
                    Add Story
                  </button>

                  <EditProfileModal
                    trigger={
                      <button className="bg-gray-200 px-4 py-2 text-black rounded-md flex justify-center gap-2 items-center">
                        <Pencil size={16} className="text-black" />
                        Edit Profile
                      </button>
                    }
                    className="p-8 w-1/2"
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  {sendFriendReqLoading ? (
                    <button className="bg-blue-500 px-4 py-2 text-white rounded-md flex justify-center gap-2 items-center">
                      <Loader2 size={16} className="text-white animate-spin" />
                      <span>Sending Request...</span>
                    </button>
                  ) : !profileLoading &&
                    profile?.friend_requests?.find(
                      (friendRequest: any) =>
                        friendRequest?.receiver?.id === profile?.id &&
                        friendRequest?.sender?.email === session?.user?.email
                    )?.is_accepted === false ? (
                    <div className="flex gap-2">
                      <button className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-md flex justify-center gap-2 items-center">
                        <Check size={16} className="text-blue-600" />
                        <span>Friend Request Sent</span>
                      </button>
                      <Popover>
                        <PopoverTrigger>
                          <div className="p-2 bg-blue-600 rounded-lg">
                            <EllipsisVertical
                              size={28}
                              className="text-white"
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent align="end">
                          {removeFriendReqLoading ? (
                            <button
                              className="text-red-600 flex gap-2 items-center"
                              disabled
                            >
                              <Loader2
                                size={16}
                                className="text-red-600 animate-spin"
                              />
                              <span>Cancelling Request...</span>
                            </button>
                          ) : (
                            <button
                              className="text-red-600 flex gap-2 items-center"
                              onClick={() =>
                                removeFriendRequest(
                                  profile?.friend_requests?.find(
                                    (friendRequest: any) =>
                                      friendRequest?.receiver?.id ===
                                        profile?.id &&
                                      friendRequest?.sender?.email ===
                                        session?.user?.email
                                  )?.id
                                )
                              }
                            >
                              <Ban size={16} className="text-red-600" />
                              <span>Cancel Request</span>
                            </button>
                          )}
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 px-4 py-2 text-white rounded-md flex justify-center gap-2 items-center"
                      onClick={() => sendFriendRequest(profile?.id)}
                    >
                      <Plus size={16} className="text-white" />
                      Send Friend Request
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Tabs */}
        </div>
      </div>
      <Tabs
        className="bg-transparent w-[70%] mx-auto -mt-10"
        defaultValue="posts"
      >
        <TabsList className="bg-white">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-lg"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-lg"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-lg"
          >
            Friends
          </TabsTrigger>
          <TabsTrigger
            value="reels"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-lg"
          >
            Reels
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-5 gap-2 mt-8">
            {/* Intro */}
            <div className="col-span-2 bg-white rounded-xl p-4 max-h-[10rem]">
              <div className="text-2xl font-bold">Intro</div>
            </div>
            {/* Newsfeed */}
            <div className="col-span-3 ">
              {session?.user?.email === profile?.email && (
                <div className="w-full bg-white rounded-xl p-4 ">
                  <div className="flex gap-2">
                    {/* <Avatar>
                    <AvatarImage src="/images/profile.jpg" alt="profile" />
                  </Avatar> */}
                    <img
                      src={profile?.profile_picture ?? "/images/default.png"}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <CreatePostOnProfileModal
                      trigger={
                        <input
                          type="text"
                          placeholder={`What's on your mind, ${profile?.first_name}? ${selectedEmoji}`}
                          className="w-full outline-none border border-gray-500 rounded-full p-2"
                          // readOnly
                          value={selectedEmoji as string}
                        />
                      }
                    />
                    {/* <EmojiPickerComponent /> */}
                  </div>
                  <hr className="my-4" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex justify-center items-center hover:bg-gray-200 gap-2 w-full h-full p-4 rounded-lg cursor-pointer">
                      <Video size={24} className="text-red-500" />
                      <p className="text-[#232b2b]">Live Video</p>
                    </div>
                    <div className="flex justify-center items-center hover:bg-gray-200 gap-2 w-full h-full p-4 rounded-lg cursor-pointer">
                      <ImagePlus size={24} className="text-green-500" />
                      <p className="text-[#232b2b]">Photo/video</p>
                    </div>
                    <div className="flex justify-center items-center hover:bg-gray-200 gap-2 w-full h-full p-4 rounded-lg cursor-pointer">
                      <Flag size={24} className="text-blue-500" />
                      <p className="text-[#232b2b]">Life Event</p>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`w-full bg-white rounded-xl p-4 ${
                  session?.user?.email === profile?.email ? "mt-4" : ""
                }`}
              >
                <div className="flex justify-between items-center gap-2 ">
                  <p className="text-xl font-bold">Posts</p>
                  <div className="flex gap-2 items-center">
                    <button className="flex gap-2 items-center bg-gray-200 px-4 py-2 text-black rounded-md">
                      <SlidersHorizontal size={16} className="text-black" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>

              {!userPostsLoading &&
                userPosts?.find(
                  (post: any) => post?.user?.email === profile?.email
                ) &&
                userPosts?.map((post: any) => {
                  return (
                    <div
                      key={post.id}
                      className="w-full bg-white rounded-xl mt-3 my-2"
                    >
                      <Post contents={post} user={post?.user} />
                    </div>
                  );
                })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmojiPickerComponent() {
  const { emojis, isLoading, error } = useGetAllEmoji();
  const [category, setCategory] = useState("smileys-emotion");
  const { selectedEmoji, setSelectedEmoji } = useSelectedEmoji();

  const { emojiCategory, emojiCategoryLoading, emojiCategoryError } =
    useGetEmojiCategory();

  const { emojiOnCategory, emojiOnCategoryLoading, emojiOnCategoryError } =
    useGetEmojiInCategory({ category });

  useEffect(() => {
    console.log("Category: " + category);
    console.log("Emojis in Category: ", emojiOnCategory);
  }, [category, emojiOnCategory]);

  if (isLoading && emojiCategoryLoading && emojiOnCategoryLoading) {
    return (
      <div className="p-2 border-2 border-gray-200 rounded-lg">
        <Loader2 size={24} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div
            className="p-2 border-2 border-gray-200 rounded-lg cursor-pointer"
            onClick={() => console.log("Emoji Picker", emojiCategory)}
          >
            <Smile size={24} className="text-blue-600" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <Carousel>
            <CarouselContent className="px-10 w-[300px]">
              {items?.map((itemName, index) => {
                const IconComponent = iconComponents[itemName.item];
                if (!IconComponent) return null;

                return (
                  <CarouselItem
                    className="basis-1/7 z-50 cursor-pointer"
                    key={index}
                    onClick={() => setCategory(itemName.label)}
                  >
                    <IconComponent size={24} className="text-blue-600" />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
          </Carousel>
          <hr className="my-2 border-gray-500" />
          <ScrollArea
            className="h-[300px] overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {emojiOnCategoryLoading && (
              <div className="p-2 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2">
                <Loader2 size={24} className="text-blue-600 animate-spin" />
                <p className="text-blue-600">
                  Loading emojis in category {category}
                </p>
              </div>
            )}

            <div className="grid grid-cols-8 gap-2">
              {emojiOnCategory?.map((emoji: any) => {
                return (
                  <div
                    key={emoji.codePoint}
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 "
                    onClick={() => setSelectedEmoji(emoji.character)}
                    onChange={() => setSelectedEmoji(emoji.character)}
                  >
                    <p>{emoji.character}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}

export const useSelectedEmoji = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  useEffect(() => {
    console.log("Selected Emoji: ", selectedEmoji); // Log the selected emoji
  }, [selectedEmoji]);

  return { selectedEmoji, setSelectedEmoji };
};
