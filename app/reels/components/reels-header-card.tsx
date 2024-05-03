import { EllipsisVertical, Pause, Play, Volume2, VolumeX } from "lucide-react";

type Props = {
  onPlay: () => void;
  onVolume: () => void;
  onPaused: () => void;
  onMute: () => void;
  playing: boolean;
  volume: boolean;
  user: any;
  created: string;
};

/* eslint-disable @next/next/no-img-element */
export default function ReelsHeaderCard({
  onPlay,
  onVolume,
  onPaused,
  onMute,
  playing,
  volume,
  user,
  created
}: Props) {
  return (
    <div className="absolute top-2 w-full flex justify-between items-center px-4 py-2 text-white ">
      {/* Left Side */}
      <div className="flex gap-2">
        <div className="w-12 h-12  rounded-full text-blue-900">
          <img
            src={"/images/profile.jpg"}
            alt="profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="block">
          <p className="text-md font-semibold">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-gray-200">{created} ago</p>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex gap-2 items-center text-white z-50">
        {playing ? (
          <Pause size={24} onClick={onPaused} className="cursor-pointer" />
        ) : (
          <Play size={24} onClick={onPlay} className="cursor-pointer" />
        )}
        {volume ? (
          <VolumeX size={24} onClick={onVolume} className="cursor-pointer" />
        ) : (
          <Volume2 size={24} onClick={onMute} className="cursor-pointer" />
        )}

        <EllipsisVertical size={24} />
      </div>
    </div>
  );
}
