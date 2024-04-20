"use client";

import React, { useEffect } from "react";
import Post from "./post";
import { images } from "@/constant/images";
import useGetAllPosts from "@/hooks/useGetAllPosts";

type Props = {};

export default function ListPostsComponent({}: Props) {
  const { posts, isLoading, error } = useGetAllPosts();

  useEffect(() => {
    console.log("POSTS", posts);
  }, [posts]);

  return (
    <div className="flex flex-col gap-4 mt-5">
      {!isLoading &&
        posts?.results?.map((post: any) => {
          console.log("POST", post);
          return <Post key={post.id} contents={post} user={post.user} />;
        })}
    </div>
  );
}
