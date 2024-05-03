"use client";

import React, { useEffect, useMemo, useState } from "react";
import Post from "./post";
import { images } from "@/constant/images";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import SharePost from "./share-post";

type Props = {};

export default function ListPostsComponent({}: Props) {
  const [postings, setPostings] = useState({} as any); // [1
  const { posts, isLoading, error } = useGetAllPosts();

  const postItems = useMemo(() => {
    return postings?.results?.map((post: any) => {
      if (post?.is_shared) {
        return post?.shares?.map((share: any, index: number) => {
          return (
            <SharePost
              key={index}
              contents={post}
              share={share}
              user={share.user}
            />
          );
        });
      } else {
        return <Post key={post.id} contents={post} user={post.user} />;
      }
    });
  }, [postings?.results]);

  useEffect(() => {
    setPostings(posts);
  }, [posts]);

  return (
    <div className="flex flex-col gap-4 mt-5">
      {!isLoading &&
        postItems?.length! > 0 &&
        postItems?.map((post: any) => {
          return post;
        })}
    </div>
  );
}
