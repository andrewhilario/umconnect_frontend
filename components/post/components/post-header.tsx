import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Earth, Lock, Users } from "lucide-react";
import React from "react";

type Props = {
  profile_picture: string;
  first_name: string;
  last_name: string;
  timestamp: string;
  post_type?: string;
  onClick?: () => void;
};

export default function PostHeaderComponent({
  profile_picture,
  first_name,
  last_name,
  onClick,
  timestamp,
  post_type
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
          <p className="text-xs text-gray-600">{timestamp}</p>
          <div className="flex gap-2 items-center text-gray-600">
            {post_type === "PUBLIC" ? (
              <Earth size={16} className="text-xs" />
            ) : post_type === "FRIENDS" ? (
              <Users size={16} className="text-xs" />
            ) : post_type === "PRIVATE" ? (
              <Lock size={16} className="text-xs" />
            ) : null}

            <p className="text-xs">
              {post_type === "PUBLIC"
                ? "Public"
                : post_type === "FRIENDS"
                ? "Friends"
                : post_type === "PRIVATE"
                ? "Only Me"
                : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
