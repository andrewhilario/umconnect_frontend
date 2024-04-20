import Navbar from "@/components/navbar/navbar";
import CreatePostComponent from "@/components/post/create-post";
import ListPostsComponent from "@/components/post/list-posts";
import ReelsComponent from "@/components/reels/reels";
import LeftSideBar from "@/components/sidebars/left-side";
import RightSideBar from "@/components/sidebars/right-side";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#EDEDED] min-h-screen">
      <Navbar />
      <div className="grid grid-cols-7 gap-4">
        <LeftSideBar />
        <div className="col-span-3 h-screen overflow-y-auto no-scrollbar">
          <div className="">
            <ReelsComponent />
            <CreatePostComponent />
            <ListPostsComponent />
          </div>
        </div>
        <RightSideBar />
      </div>
    </div>
  );
}
