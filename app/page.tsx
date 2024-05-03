"use client";

import Navbar from "@/components/navbar/navbar";
import CreatePostComponent from "@/components/post/create-post";
import ListPostsComponent from "@/components/post/list-posts";
import StoryComponent from "@/components/story/story";

import LeftSideBar from "@/components/sidebars/left-side";
import RightSideBar from "@/components/sidebars/right-side";
import { Wrench } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const MobileView = () => {
  return (
    <div className="bg-white w-full h-screen fixed top-0 left-0 z-50">
      <p className="text-5xl text-center my-[10rem] w-full flex flex-col items-center">
        <Wrench
          size={200}
          className="mx-auto text-gray-500 my-10 border-2 border-gray-500 border-dashed rounded-full p-2"
        />
        <strong>This site is not available on mobile view.</strong>
        <strong className="text-2xl text-center mt-4 w-3/4 text-gray-500">
          We are working on it. Please visit the site on a desktop or laptop
        </strong>
      </p>
    </div>
  );
};

export default function Home() {
  // get the dimnesion of the viewport
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") setWindowWidth(window.innerWidth);
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < 1024) {
    return <MobileView />;
  } else {
    return (
      <div className="bg-[#EDEDED] min-h-screen">
        <Navbar />
        <div className="grid grid-cols-7 gap-4">
          <LeftSideBar />
          <div className="col-span-3 h-screen overflow-y-auto no-scrollbar">
            <div className="">
              <StoryComponent />
              <CreatePostComponent />
              <ListPostsComponent />
            </div>
          </div>
          <RightSideBar />
        </div>
      </div>
    );
  }
}
