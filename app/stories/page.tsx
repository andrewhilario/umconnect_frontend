/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/navbar/navbar";
import {
  Carousel,
  CarouselContent,
  CarouselContext,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import useGetAllStories from "@/hooks/useGetAllStories";
import { formatDistanceToNow } from "date-fns";
import Stories from "react-insta-stories";

export default function StoriesPage() {
  const { getAllStories, loadingStories } = useGetAllStories();

  const groupStoriesByUser = () => {
    const storiesByUserId: { [key: string]: any[] } = {}; // Add type annotation for storiesByUserId
    getAllStories?.results?.forEach((story: any) => {
      const userId = story.user.id;
      if (!storiesByUserId[userId]) {
        storiesByUserId[userId] = [story];
      } else {
        storiesByUserId[userId].push(story);
      }
    });
    return storiesByUserId;
  };

  const storiesByUserId = groupStoriesByUser();

  return (
    <div className="w-full bg-[#EDEDED] h-screen">
      <Navbar />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold p-4">Stories</h1>
        <div className="flex gap-2 items-center">
          <button className="bg-[#121212] text-white px-4 py-2 rounded-lg mr-4">
            Create Story
          </button>
        </div>
      </div>
      <Carousel className="w-1/5 mx-auto">
        <CarouselContent>
          {loadingStories && (
            <CarouselItem>
              <Skeleton className="w-full h-[750px] bg-gray-400 rounded-xl" />
            </CarouselItem>
          )}
          {!loadingStories &&
            Object.entries(storiesByUserId).map(([userId, userStories]) => (
              <CarouselItem key={userId} className="relative">
                <div className="absolute flex items-center gap-2 p-2 z-50 mt-5">
                  <div className="flex items-center gap-2">
                    <img
                      src={userStories[0].user.profile_picture}
                      alt="profile"
                      className="w-12 h-12 border-2 border-blue-600 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-white font-semibold">
                      {userStories[0].user.username}
                    </p>
                    <p className="text-white text-xs">
                      {formatDistanceToNow(
                        new Date(
                          userStories?.find(
                            (sty) => sty.user.id === userStories[0].user.id
                          )?.created_at
                        ),
                        {
                          addSuffix: true
                        }
                      )}
                    </p>
                  </div>
                </div>
                <Stories
                  stories={userStories.map((sty) => sty.story)}
                  storyStyles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
