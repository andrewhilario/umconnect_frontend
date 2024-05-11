/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Bell,
  LogOut,
  MessageCircleMore,
  MonitorPlay,
  User
} from "lucide-react";
import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUpdateAuthToken from "@/hooks/useUpdateAuthToken";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import HeaderNav from "../mobile-components/header-nav";
import ProfileImageComponent from "../profile-image/profile-image";
import useGetAllNotifications from "@/hooks/useGetAllNotification";
import useUpdateNotification from "@/hooks/useUpdateNotification";
import useUpdateAllNotification from "@/hooks/useUpdateAllNotifcation";

type Props = {};

export default function Navbar({}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { updateToken } = useUpdateAuthToken();
  const { profile } = useGetProfileByUser();
  const { notifications, notificationsLoading } = useGetAllNotifications();
  const { updateNotification } = useUpdateNotification();
  const { updateAllNotification } = useUpdateAllNotification();

  useEffect(() => {
    console.log("SESSION", session?.token);
  }, [session]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Updating Token");
      updateToken();
    }, 1000 * 60 * 10);
  }, [updateToken]);

  return (
    <div className="block sticky top-0 z-50">
      <div className="bg-blue-600 w-full z-10 flex justify-between items-center p-2">
        {/* Logo */}
        <div className="flex gap-12 items-center p-4">
          <h1
            className="text-white text-2xl xl:text-4xl font-medium cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            UM Connect
          </h1>
          <div className="hidden xl:flex gap-6 items-center text-white">
            <Popover>
              <PopoverTrigger>
                <div className="relative">
                  <div
                    className={`${
                      !notificationsLoading &&
                      notifications?.results?.length > 0 &&
                      !notifications?.results?.every(
                        (notifs: any) => notifs.is_read
                      )
                        ? "animate-pulse bg-red-500"
                        : ""
                    } absolute top-0 right-0 w-2 h-2 rounded-full`}
                  ></div>
                  <Bell size={32} className="text-white cursor-pointer" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="p-2 w-[150px] text-sm xl:w-[400px] xl:text-md"
                align="start"
              >
                <div className="flex justify-between items-center gap-2 cursor-pointer p-2 rounded-lg w-full text-xl font-semibold">
                  <p>Notifications</p>
                  <p
                    className="text-blue-500 text-sm cursor-pointer"
                    onClick={() => {
                      updateAllNotification();
                    }}
                  >
                    Mark all as read
                  </p>
                </div>
                {!notificationsLoading &&
                  notifications?.results?.length === 0 && (
                    <div className="flex justify-center items-center gap-2 text-gray-400 text-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg w-full text-lg py-24">
                      <p>No Notifications</p>
                    </div>
                  )}
                <div className="w-full h-[300px] overflow-y-auto scrollbar-thin ">
                  {!notificationsLoading &&
                    notifications?.results?.map((notifs: any) => {
                      return (
                        <div
                          key={notifs.id}
                          className={`flex cursor-pointer p-3 rounded-lg w-full text-lg flex-col my-1 ${
                            !notifs.is_read ? "bg-blue-500" : ""
                          }`}
                          onClick={() => {
                            updateNotification(notifs.id);
                          }}
                        >
                          <p
                            className={`${
                              !notifs.is_read ? "text-white" : "text-black"
                            } font-semibold text-[16px]`}
                          >
                            {notifs.title}
                          </p>
                          <p
                            className={`${
                              !notifs?.is_read ? "text-white" : "text-black"
                            } text-sm`}
                          >
                            {notifs.message}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </PopoverContent>
            </Popover>
            <MessageCircleMore
              size={32}
              className="cursor-pointer"
              onClick={() => {
                router.push("/messages");
              }}
            />
            <MonitorPlay size={32} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-4 items-center p-4">
          <input
            type="text"
            placeholder="Search"
            className="bg-white p-2 rounded-lg hidden xl:block"
          />
          <Popover>
            <PopoverTrigger>
              <ProfileImageComponent
                image={profile?.profile_picture}
                className="w-12 h-12  rounded-full text-blue-900"
                imageClassName="rounded-full w-full h-full object-cover"
              />
            </PopoverTrigger>
            <PopoverContent
              className="p-2 w-[150px] text-sm xl:w-full xl:text-md"
              align="end"
            >
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                onClick={() => {
                  router.push(`/profile/${session?.username}`);
                }}
              >
                <User size={24} className="text-blue-600" />
                <p>Profile</p>
              </div>
              <div
                className="flex xl:hidden items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                onClick={() => {
                  router.push("/reels");
                }}
              >
                <MonitorPlay size={24} className="text-blue-600" />
                <p>Reels</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg mt-2"
                onClick={() => {
                  signOut().then(() => {
                    router.push("/login");
                  });
                }}
              >
                <LogOut size={24} className="text-red-500" />
                <p>Logout</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="block xl:hidden">
        <HeaderNav />
      </div>
    </div>
  );
}
