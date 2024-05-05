/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { CirclePlus, User } from "lucide-react";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import useGetAllStories from "@/hooks/useGetAllStories";
import { Skeleton } from "../ui/skeleton";
import { StoryData } from "@/types/stories";
import { useRouter } from "next/navigation";

type Props = {};

export default function StoryComponent({}: Props) {
  const router = useRouter();
  const { profile } = useGetProfileByUser();
  const { getAllStories, loadingStories } = useGetAllStories();

  const stories = new Map();

  getAllStories?.results?.forEach((story: StoryData) => {
    const userId = story.user.id;
    if (!stories.has(userId)) {
      stories.set(userId, story);
    }
  });

  const storiesArray = Array.from(stories.values());

  return (
    <Carousel className="mt-4">
      <CarouselContent>
        <CarouselItem
          className="basis-1/5 cursor-pointer"
          onClick={() => router.push("/stories/create")}
        >
          <div className="relative rounded-lg h-full">
            <img
              src={profile?.profile_picture ?? "/images/default.png"}
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <CirclePlus size={20} className="text-white text-center" />
              <p className="text-white text-center text-xs mt-1">Your Story</p>
            </div>
          </div>
        </CarouselItem>
        {loadingStories &&
          Array.from({ length: 5 }).map((_, index) => {
            return (
              <CarouselItem className="basis-1/5" key={index}>
                <Skeleton className="w-full h-[250px] rounded-lg bg-gray-600" />
              </CarouselItem>
            );
          })}

        {storiesArray?.map((story: StoryData) => {
          return (
            <CarouselItem
              className="basis-1/5 cursor-pointer"
              key={story.id}
              onClick={() => router.push("/stories")}
            >
              <div className="relative rounded-lg h-full">
                <img
                  src={story.story}
                  alt="Reel"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
                  <User size={20} className="text-white text-center" />
                  <p className="text-white text-center text-xs mt-1">
                    {story.user.username}
                  </p>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
