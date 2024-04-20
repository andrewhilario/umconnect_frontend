import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Earth } from "lucide-react";
import React from "react";

type Props = {
  profile_picture: string;
  first_name: string;
  last_name: string;
  onClick?: () => void;
};

export default function PostHeaderComponent({
  profile_picture,
  first_name,
  last_name,
  onClick
}: Props) {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src={profile_picture} alt="profile" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="block">
        <p
          className="text-md text-blue-600 hover:underline cursor-pointer"
          onClick={onClick}
        >
          <strong>
            {first_name} {last_name}
          </strong>
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-xs text-gray-600">2 hours ago</p>
          <div className="flex gap-2 items-center text-gray-600">
            <Earth size={16} className="text-xs" />
            <p className="text-xs">Public</p>
          </div>
        </div>
      </div>
    </div>
  );
}
