"use client";
import Navbar from "@/components/navbar/navbar";
import { useToast } from "@/components/ui/use-toast";
import useCreateReels from "@/hooks/useCreateReels";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CreateReelsPage() {
  const { toast } = useToast();
  const [reels, setReels] = useState<File>();
  const [reelVideo, setReelVideo] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const { createReel, createLoading } = useCreateReels();

  const handleOnReelsChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "video/mp4") {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid mp4 file",
        variant: "destructive"
      });
    } else if (file.size > 5000000) {
      toast({
        title: "File too large",
        description: "Please upload a file less than 5MB",
        variant: "destructive"
      });
    } else {
      setReelVideo(URL.createObjectURL(file));
      setReels(file);
    }
  };

  const handleOnCreateReel = () => {
    console.log({
      reel_video: reels,
      reel_caption: caption
    });
    const reelData = {
      reel_video: reels,
      reel_caption: caption
    };

    createReel(reelData, {
      onSuccess: () => {
        setReels(undefined);
        setCaption("");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Error creating reel",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="w-full bg-[#EDEDED] h-screen">
      <Navbar />
      <div className="grid grid-cols-6 gap-2 divide-x-2">
        <div className="col-span-1 min-h-[85vh] p-4 flex flex-col">
          <div className="text-lg mb-5">
            <p className="font-semibold hover:underline"> Create Reels</p>
          </div>
          <input
            type="text"
            placeholder="Caption"
            className="border border-[#121212] rounded-lg px-3 py-2 mb-5"
            onChange={(e) => setCaption(e.target.value)}
          />
          <label
            htmlFor="upload-reels"
            className="rounded-lg border-2 border-dashed border-[#121212] flex flex-col items-center justify-center h-40 cursor-pointer"
          >
            <Plus size={24} />
            <p className="text-[#121212]">Upload Reels</p>
          </label>
          <input
            type="file"
            name=""
            id="upload-reels"
            className="hidden"
            accept="video/mp4"
            onChange={handleOnReelsChange}
          />
          {createLoading ? (
            <button
              className="mt-auto 
           disabled:bg-blue-700 text-blue-200  px-3 py-2 rounded-lg flex items-center justify-center gap-2"
              disabled
            >
              <Loader2 size={24} className="animate-spin" />
              <span>Uploading...</span>
            </button>
          ) : (
            <button
              className="mt-auto 
          text-blue-600 border border-blue-600  px-3 py-2 rounded-lg"
              onClick={handleOnCreateReel}
            >
              Upload
            </button>
          )}
        </div>
        <div className="col-span-5 flex justify-center items-center">
          <div className="w-1/4 rounded-lg  bg-gray-300 h-[750px] relative">
            {reels && (
              <>
                <video
                  src={reelVideo}
                  className="w-full h-full object-fill rounded-lg"
                  muted
                  autoPlay
                ></video>
                <Trash2
                  size={32}
                  className="absolute top-2 right-2 cursor-pointer text-red-500"
                  onClick={() => setReels(undefined)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
