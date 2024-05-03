"use client";
/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/navbar/navbar";
import { useToast } from "@/components/ui/use-toast";
import useCreateStory from "@/hooks/useCreateStory";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CreateStories() {
  const { profile } = useGetProfileByUser();
  const { toast } = useToast();
  const [story, setStory] = useState<File>();
  const [storyImage, setStoryImage] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const { createStory, createLoading } = useCreateStory();

  const handleOnStoryChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    if (
      file.type !== "image/jpg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/webp"
    ) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file",
        variant: "destructive"
      });
    } else if (file.size > 5000000) {
      toast({
        title: "File too large",
        description: "Please upload a file less than 5MB",
        variant: "destructive"
      });
    } else {
      setStoryImage(URL.createObjectURL(file));
      setStory(file);
    }
  };

  const handleOnCreateStory = () => {
    console.log({
      story: story
    });
    const storyData = {
      story: story
    };

    createStory(storyData, {
      onSuccess: () => {
        setStory(undefined);
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
        <div className="col-span-1 min-h-[89.5vh] p-4 flex flex-col bg-white">
          <div className="text-lg mb-5">
            <p className="font-semibold hover:underline"> Create Story</p>
          </div>
          {/* <input
            type="text"
            placeholder="Caption"
            className="border border-[#121212] rounded-lg px-3 py-2 mb-5"
          /> */}
          <label
            htmlFor="upload-reels"
            className="rounded-lg border-2 border-dashed border-[#121212] flex flex-col items-center justify-center h-40 cursor-pointer"
          >
            <Plus size={24} />
            <p className="text-[#121212]">Upload Story</p>
          </label>
          <input
            type="file"
            name=""
            id="upload-reels"
            className="hidden"
            accept="image/*"
            onChange={handleOnStoryChange}
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
              onClick={handleOnCreateStory}
            >
              Upload
            </button>
          )}
        </div>
        <div className="col-span-5 flex justify-center items-center">
          <div className="w-1/4 rounded-lg  bg-gray-300 h-[750px] relative">
            {story && (
              <>
                <img
                  src={storyImage}
                  alt="Story"
                  className="w-full h-full object-cover rounded-lg"
                />
                <Trash2
                  size={32}
                  className="absolute top-2 right-2 cursor-pointer text-red-500"
                  onClick={() => setStory(undefined)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
