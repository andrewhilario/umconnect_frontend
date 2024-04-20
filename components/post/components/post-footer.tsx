import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { MessageSquareMore, Send, ThumbsUp } from "lucide-react";
import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

type Props = {};

export default function PostFooterComponent({}: Props) {
  const { profile } = useGetProfileByUser();
  return (
    <div className="block">
      <div className="flex items-center gap-10">
        <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <AiOutlineLike size={16} className="text-blue-600" />
          <p className="text-sm font-medium">Like</p>
        </div>
        <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <MessageSquareMore size={16} className="text-blue-600" />
          <p className="text-sm font-medium">Comment</p>
        </div>
        <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <FaShare size={16} className="text-blue-600" />
          <p className="text-sm font-medium">Share</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 mt-5 mb-3">
        <Avatar className="w-10 h-10 border border-blue-600">
          {profile?.profile_picture && (
            <AvatarImage src={profile?.profile_picture} alt="profile" />
          )}
          <AvatarFallback className="bg-gray-500 text-white">
            {profile?.first_name[0] + profile?.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <form action="" className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full px-6 py-2 border border-gray-300 rounded-full"
          />
          <button type="submit" className="bg-blue-600 px-6 rounded-full">
            <Send size={24} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
