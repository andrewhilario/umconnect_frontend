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

type Props = {};

export default function Navbar({}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { updateToken } = useUpdateAuthToken();

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
    <div className="bg-blue-600 w-full sticky top-0 z-10 flex justify-between items-center p-2">
      {/* Logo */}
      <div className="flex gap-12 items-center p-4">
        <h1
          className="text-white text-4xl font-medium cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          UM Connect
        </h1>
        <div className="flex gap-6 items-center text-white">
          <Bell size={24} />
          <MessageCircleMore
            size={24}
            onClick={() => {
              router.push("/messages");
            }}
          />
          <MonitorPlay size={24} />
        </div>
      </div>
      <div className="flex gap-4 items-center p-4">
        <input
          type="text"
          placeholder="Search"
          className="bg-white p-2 rounded-lg"
        />
        <Popover>
          <PopoverTrigger>
            <div className="rounded-full bg-white text-blue-900 p-2">
              <User size={32} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2" align="end">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
              onClick={() => {
                router.push("/profile");
              }}
            >
              <User size={24} className="text-blue-600" />
              <p>Profile</p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg mt-2"
              onClick={() => {
                signOut();
              }}
            >
              <LogOut size={24} className="text-red-500" />
              <p>Logout</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
