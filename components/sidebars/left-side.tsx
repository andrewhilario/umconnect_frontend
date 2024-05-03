"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Film,
  MonitorPlay,
  ShoppingCart,
  UserCheck2,
  UsersRound
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { useRouter } from "next/navigation";

type Props = {};

export default function LeftSideBar({}: Props) {
  const { profile } = useGetProfileByUser();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 p-5 col-span-2 w-[80%] justify-self-start ">
      <div
        className="flex items-center gap-2
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
        onClick={() => router.push(`/profile`)}
      >
        <Avatar className="border-2 border-blue-600 ">
          <AvatarImage
            src={profile?.profile_picture ?? "/images/profile.jpg"}
            alt="profile"
          />
          <AvatarFallback>
            {profile?.first_name[0]} {profile?.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-2xl">
            <strong>
              {profile?.first_name} {profile?.last_name}
            </strong>
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-4
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <UserCheck2 size={24} className="text-blue-600" />
        <div>
          <p className="text-lg">Friends</p>
        </div>
      </div>
      <div
        className="flex items-center gap-4
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <UsersRound size={24} className="text-blue-600" />
        <div>
          <p className="text-lg">Groups</p>
        </div>
      </div>
      <div
        className="flex items-center gap-4
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <ShoppingCart size={24} className="text-blue-600" />
        <div>
          <p className="text-lg">Marketplace</p>
        </div>
      </div>
      <div
        className="flex items-center gap-4
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <MonitorPlay size={24} className="text-blue-600" />
        <div>
          <p className="text-lg">Watch</p>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full hover:no-underline hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-full justify-between">
            See more
          </AccordionTrigger>
          <AccordionContent
            className="flex items-center gap-4
            cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            onClick={() => router.push(`/reels`)}
          >
            <Film size={24} className="text-blue-600" />
            <div>
              <p className="text-lg">Reels</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
