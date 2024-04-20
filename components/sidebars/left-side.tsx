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

type Props = {};

export default function LeftSideBar({}: Props) {
  return (
    <div className="flex flex-col gap-2 p-5 col-span-2 w-[80%] justify-self-start ">
      <div
        className="flex items-center gap-2
        cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <Avatar className="border-2 border-blue-600 ">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-2xl">
            <strong>Shad CN</strong>
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
