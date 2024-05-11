"use client";

import useGetFriendLists from "@/hooks/useGetFriendLists";
import { MapPin, Pin } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function RightSideBar({}: Props) {
  const { friends, isLoading } = useGetFriendLists();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!isLoading) {
      console.log("FRIENDS", friends);
      console.log("SESSION", session);
    }
  }, [friends, isLoading, session]);

  return (
    // Pages and Profile
    <div className="w-[80%] justify-self-end flex flex-col gap-2 m-4 p-4 rounded-lg bg-white col-span-2">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Events</p>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          See All
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <p className="px-8 py-5 text-center rounded-t-lg">20</p>
          <p className="px-5 py-2 bg-blue-700 text-white rounded-b-lg text-center">
            Sept
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Event 1</p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
            <p className="">Location</p>
          </div>
          <p className="text-blue-600 hover:underline text-sm">More Info</p>
        </div>
      </div>
      <div className="flex items-center gap-4  mt-4">
        <div>
          <p className="px-8 py-5 text-center rounded-t-lg">20</p>
          <p className="px-5 py-2 bg-blue-700 text-white rounded-b-lg text-center">
            Sept
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold">Event 2</p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
            <p className="">Location</p>
          </div>
          <p className="text-blue-600 hover:underline text-sm">More Info</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Advertisement</p>
        <a
          href="http://"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Close
        </a>
      </div>
      <div>
        <Image
          src={
            "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="Vercel Logo"
          width={1280}
          height={720}
          className="w-full rounded-lg"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">Chat</p>
      </div>
      <div className="block h-96 overflow-y-scroll no-scrollbar">
        {!isLoading &&
          friends?.results?.map((fr: any) => {
            if (fr.friend.email === session?.user?.email) {
              return (
                <div
                  className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  key={fr.user.id}
                  onClick={() => {
                    router.push(`/messages?friend=${fr.user.id}`);
                  }}
                >
                  <div>
                    <Image
                      src={fr.user.profile_picture ?? "/images/default.png"}
                      alt="Vercel Logo"
                      width={500}
                      height={500}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">
                      {fr.user.first_name} {fr.user.last_name}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  key={fr.friend.id}
                  onClick={() => {
                    router.push(`/messages?friend=${fr.friend.id}`);
                  }}
                >
                  <div>
                    <Image
                      src={fr.friend.profile_picture ?? "/images/default.png"}
                      alt="Vercel Logo"
                      width={500}
                      height={500}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">
                      {fr.friend.first_name} {fr.friend.last_name}
                    </p>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
