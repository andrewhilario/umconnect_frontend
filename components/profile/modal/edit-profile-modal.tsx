/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
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
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { useRouter } from "next/navigation";

type Props = {
  trigger: React.ReactNode;
  className?: string;
};

export default function EditProfileModal({ trigger, className }: Props) {
  const { profile } = useGetProfileByUser();
  const router = useRouter();
  const [profilePicture, setProfilePicture] = React.useState<string>("");
  const [coverPicture, setCoverPicture] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { updateProfile } = useUpdateProfile();

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  const onProfilePhotoChange = (e: any) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      toast({
        title: "Oops!",
        description: "File size exceeds 2MB",
        variant: "destructive"
      });
    }

    setProfilePicture(file);

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const dataUrl = reader.result;
    //   setProfilePicture(dataUrl as string);
    // };
  };

  const onCoverPhotoChange = (e: any) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      toast({
        title: "Oops!",
        description: "File size exceeds 2MB",
        variant: "destructive"
      });
    }

    setCoverPicture(file);
  };

  const onEditSubmit = (data: any) => {
    const editData = {
      ...data,
      profile_picture: profilePicture,
      cover_picture: coverPicture
    };
    console.log("PROFILE IMAGE AND COVER IMAGE", profilePicture, coverPicture);

    console.log("Edit Profile Data", editData);

    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("bio", data.bio);

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    if (coverPicture) {
      formData.append("cover_photo", coverPicture);
    }

    updateProfile(formData, {
      onSuccess: () => {
        setProfilePicture("");
        setCoverPicture("");

        router.refresh();
      }
    });
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
                src={URL.createObjectURL(new Blob([profilePicture]))}
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
                src={URL.createObjectURL(new Blob([coverPicture]))}
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
              placeholder="First Name"
              className="rounded-lg p-2 border border-gray-400"
              defaultValue={profile?.first_name}
              {...register("first_name", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              placeholder="Last Name"
              className="rounded-lg p-2 border border-gray-400"
              defaultValue={profile?.last_name}
              {...register("last_name", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="rounded-lg p-2 border border-gray-400"
              readOnly
              defaultValue={profile?.email}
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Oops!",
                  description: "Email cannot be changed",
                  variant: "destructive"
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="phone">Bio</label>
            <Textarea
              id="bio"
              placeholder="Bio"
              className="rounded-lg p-2 border border-gray-400"
              defaultValue={profile?.bio}
              {...register("bio", { required: true })}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit(onEditSubmit)}
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
