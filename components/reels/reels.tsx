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

type Props = {};

export default function ReelsComponent({}: Props) {
  return (
    <Carousel className="mt-4">
      <CarouselContent>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg">
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <CirclePlus size={20} className="text-white text-center" />
              <p className="text-white text-center text-xs mt-1">Your Story</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg ">
            <div className="rounded-full w-8 h-8 absolute top-0 left-0 m-2">
              {/* <User
                size={20}
                className="text-white text-center bg-blue-500 rounded-full w-full h-full p-1"
              /> */}
              <img
                src="https://picsum.photos/200/300"
                alt="User"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <p className="text-white text-center text-xs mt-1">John Doe</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg">
            <div className="rounded-full w-8 h-8 absolute top-0 left-0 m-2">
              {/* <User
                size={20}
                className="text-white text-center bg-blue-500 rounded-full w-full h-full p-1"
              /> */}
              <img
                src="https://picsum.photos/200/300"
                alt="User"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <p className="text-white text-center text-xs mt-1">Jane Doe</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg">
            <div className="rounded-full w-8 h-8 absolute top-0 left-0 m-2">
              {/* <User
                size={20}
                className="text-white text-center bg-blue-500 rounded-full w-full h-full p-1"
              /> */}
              <img
                src="https://picsum.photos/200/300"
                alt="User"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <p className="text-white text-center text-xs mt-1">Jane Doe</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg">
            <div className="rounded-full w-8 h-8 absolute top-0 left-0 m-2">
              {/* <User
                size={20}
                className="text-white text-center bg-blue-500 rounded-full w-full h-full p-1"
              /> */}
              <img
                src="https://picsum.photos/200/300"
                alt="User"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <p className="text-white text-center text-xs mt-1">Jane Doe</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-1/5">
          <div className="relative rounded-lg">
            <div className="rounded-full w-8 h-8 absolute top-0 left-0 m-2">
              {/* <User
                size={20}
                className="text-white text-center bg-blue-500 rounded-full w-full h-full p-1"
              /> */}
              <img
                src="https://picsum.photos/200/300"
                alt="User"
                className="w-full h-full object-cover rounded-full border-2 border-white"
              />
            </div>
            <img
              src="https://picsum.photos/200/300"
              alt="Reel"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black to-transparent rounded-b-lg justify-center flex flex-col items-center">
              <p className="text-white text-center text-xs mt-1">Jane Doe</p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
