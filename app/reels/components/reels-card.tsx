"use client";
import { useEffect, useState } from "react";
import ReelsHeaderCard from "./reels-header-card";
import ReactPlayer from "react-player";
import { formatDistanceToNow } from "date-fns";

type Props = {
  isActive?: boolean;
  reel: any;
};

export default function ReelsCard({ isActive, reel }: Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  console.log(reel);

  return (
    <div className="w-full  rounded-xl  bg-gray-400 relative">
      <ReelsHeaderCard
        onPlay={() => setIsPlaying(!isPlaying)}
        onPaused={() => setIsPlaying(!isPlaying)}
        onMute={() => setIsMuted(!isMuted)}
        playing={isPlaying}
        onVolume={() => setIsMuted(!isMuted)}
        volume={isMuted}
        user={reel?.user || ""}
        created={formatDistanceToNow(new Date(reel?.created_at || ""))}
      />
      <div className="w-full h-[750px] rounded-xl">
        <ReactPlayer
          url={reel?.reel_video || ""}
          width="100%"
          height="100%"
          style={{ borderRadius: "1rem", overflow: "hidden" }}
          playing={isPlaying}
          muted={isMuted}
          loop
        />
      </div>
    </div>
  );
}
