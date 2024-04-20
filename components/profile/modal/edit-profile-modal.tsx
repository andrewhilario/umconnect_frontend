/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;
  className?: string;
};

export default function EditProfileModal({ trigger, className }: Props) {
  const [profilePicture, setProfilePicture] = React.useState<string>("");
  const [coverPicture, setCoverPicture] = React.useState<string>("");

  const onProfilePhotoChange = (e: any) => {
    const file = e.target.files[0]!;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result;
      setProfilePicture(dataUrl as string);
    };
  };

  const onCoverPhotoChange = (e: any) => {
    const file = e.target.files[0]!;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result;
      setCoverPicture(dataUrl as string);
    };
  };

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={cn("p-4 rounded-lg ", className)}>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            You can edit your profile information here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 space-y overflow-y-scroll no-scrollbar">
          {/* Profile  */}
          <div className="flex flex-col gap-4 ">
            <h1>Profile Picture</h1>
            {!profilePicture ? (
              <label
                htmlFor="profile_picture"
                className="w-32 h-32 border-dashed border-gray-600 rounded-full border-2 text-center flex justify-center items-center cursor-pointer mx-auto"
              >
                Profile Picture
              </label>
            ) : (
              <img
                src={profilePicture}
                alt="profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            )}

            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              className="rounded-lg p-2 border border-gray-400 hidden object-cover"
              onChange={onProfilePhotoChange}
            />
          </div>

          {/* Cover */}

          <div className="flex flex-col gap-4 ">
            <h1>Cover Picture</h1>
            {!coverPicture ? (
              <label
                htmlFor="cover_picture"
                className="w-full h-32  border-dashed border-gray-600 rounded-lg  border-2 text-center flex justify-center items-center cursor-pointer mx-auto"
              >
                Cover Picture
              </label>
            ) : (
              <img
                src={coverPicture}
                alt="profile"
                className="w-full h-44 mx-auto rounded-lg object-cover"
              />
            )}
            <input
              type="file"
              id="cover_picture"
              name="cover_picture"
              className="rounded-lg p-2 border border-gray-400 hidden"
              onChange={onCoverPhotoChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              className="rounded-lg p-2 border border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="rounded-lg p-2 border border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="rounded-lg p-2 border border-gray-400"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="phone">Bio</label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Bio"
              className="rounded-lg p-2 border border-gray-400"
            />
          </div>
        </div>
        <DialogFooter>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
