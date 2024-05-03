"use client";
/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/navbar/navbar";
import {
  Carousel,
  CarouselContent,
  CarouselContext,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import ReelsCard from "./components/reels-card";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useGetAllReels from "@/hooks/useGetAllReels";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReelsPage() {
  const router = useRouter();
  const { profile } = useGetProfileByUser();
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isReelPaused, setIsReelPaused] = useState(false);

  const { getAllResls, getAllReelsLoading } = useGetAllReels();

  return (
    <div className="w-full bg-[#EDEDED] h-screen">
      <Navbar />
      {/* Reels Header */}
      <div className="flex justify-between items-center px-5 py-2">
        <p className="text-lg font-semibold hover:underline cursor-pointer text-blue-600">
          Reels
        </p>
        <div className="flex gap-2 items-center">
          <button
            className="text-blue-600 border border-blue-600  px-3 py-2 rounded-lg"
            onClick={() => router.push("/reels/create")}
          >
            Create
          </button>

          <div className="w-12 h-12  rounded-full text-blue-900">
            <img
              src={profile?.profile_picture}
              alt="profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Reels */}
      <Carousel className="w-1/5 mx-auto">
        <CarouselContent>
          {getAllReelsLoading && (
            <CarouselItem>
              <Skeleton className="w-full h-[750px] bg-gray-400 rounded-xl" />
            </CarouselItem>
          )}

          {!getAllReelsLoading &&
            getAllResls?.results?.map((reel: any) => {
              return (
                <CarouselItem key={reel.id}>
                  <ReelsCard reel={reel} />
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
