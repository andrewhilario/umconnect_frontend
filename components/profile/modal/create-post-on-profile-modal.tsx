/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Camera, Earth, Lock, Users, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { FaPray } from "react-icons/fa";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import useCreatePost from "@/hooks/useCreatePost";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import EmojiPickerComponent, {
  useSelectedEmoji
} from "@/components/emoji-picker/emoji-picker";

type Props = {
  trigger: React.ReactNode;
  className?: string;
};

function CreatePostComponentOnProfile() {
  const [privacy, setPrivacy] = useState("Public");
  const [images, setImages] = useState([] as string[]);
  const [postImages, setPostImages] = useState([] as File[]);
  const { profile } = useGetProfileByUser();
  const { createPost, createPostLoading } = useCreatePost();
  const { toast } = useToast();
  const { selectedEmoji } = useSelectedEmoji();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onPostSubmit = (data: any) => {
    let post_type;

    if (privacy === "Public") {
      post_type = "PUBLIC";
    } else if (privacy === "Friends") {
      post_type = "FRIENDS";
    } else {
      post_type = "PRIVATE";
    }

    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("post_type", post_type);
    if (postImages) {
      console.log(postImages);
      postImages.forEach((file) => {
        formData.append("post_image", file);
        // clear the file input
      });
    }

    createPost(formData, {
      onSuccess: () => {
        reset();
        setImages([]);
        setPostImages([] as File[]);
        toast({
          title: "Success",
          description: "Post created successfully",
          variant: "default"
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
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

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl ">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={profile?.profile_picture ?? "/images/default.png"}
            alt="User"
            className="object-cover"
          />
        </Avatar>
        <div className="block">
          <p className="text-md">
            <strong>
              {profile?.first_name} {profile?.last_name}
            </strong>
          </p>
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-lg">
              {privacy === "Public" && (
                <>
                  <Earth size={16} />
                  <p className="text-sm">Public</p>
                </>
              )}
              {privacy === "Friends" && (
                <>
                  <Users size={16} />
                  <p className="text-sm">Friends</p>
                </>
              )}
              {privacy === "Only Me" && (
                <>
                  <Lock size={16} />
                  <p className="text-sm">Only Me</p>
                </>
              )}
            </PopoverTrigger>
            <PopoverContent align="start" className="p-1">
              <div className="space-y ">
                <div
                  className="text-sm flex items-center gap-2 hover:bg-gray-200 p-1 rounded-lg cursor-pointer"
                  onClick={() => {
                    handlePrivacy("Public");
                  }}
                >
                  <Earth size={16} />
                  <p className="text-sm">Public</p>
                </div>
                <div
                  className="text-sm flex items-center gap-2 hover:bg-gray-200 p-1 rounded-lg cursor-pointer"
                  onClick={() => handlePrivacy("Friends")}
                >
                  <Users size={16} />
                  <p className="text-sm">Friends</p>
                </div>
                <div
                  className="text-sm flex items-center gap-2 hover:bg-gray-200 p-1 rounded-lg cursor-pointer"
                  onClick={() => handlePrivacy("Only Me")}
                >
                  <Lock size={16} />
                  <p className="text-sm">Only Me</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <form
        className="block w-full relative"
        onSubmit={handleSubmit(onPostSubmit)}
      >
        {/* <EmojiPickerComponent
          className="absolute right-2 top-10 cursor-pointer"
          onClick={() => console.log("Emoji Picker", selectedEmoji)}
        /> */}
        <Textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-400 focus:ring-0 focus:outline-none mt-2 resize-none"
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

        <hr className="my-2" />
        <div className="flex flex-col w-full gap-2 items-center">
          <label
            htmlFor="photo"
            className="w-full justify-center flex gap-2 border-2 border-gray-400 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
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
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreatePostOnProfileModal({
  trigger,
  className
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{trigger}</DialogTrigger>
      <DialogContent className="w-1/3">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Create Post
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 text-sm">
            You can create a post here.
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2 border-black" />
        <CreatePostComponentOnProfile />
      </DialogContent>
    </Dialog>
  );
}
