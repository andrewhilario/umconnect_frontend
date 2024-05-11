"use client";

import React, { useEffect, useMemo, useState } from "react";
import Post from "./post";
import { images } from "@/constant/images";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import SharePost from "./share-post";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ListPostLoading from "./components/list-post-loading";

type Props = {};

export default function ListPostsComponent({}: Props) {
  const [postings, setPostings] = useState([] as any[]); // [1
  const { posts, isLoading, error, setPage, page } = useGetAllPosts();

  useEffect(() => {
    // Append new posts to the existing list
    if (posts && posts.results) {
      setPostings((prevPostings) => {
        if (Array.isArray(prevPostings)) {
          return [...prevPostings, ...posts.results];
        } else {
          return [...posts.results];
        }
      });
    }
  }, [posts]);

  const postItems = useMemo(() => {
    if (Array.isArray(postings)) {
      return postings.map((post: any) => {
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
    } else {
      return null; // or any other fallback value
    }
  }, [postings]);

  if (isLoading) {
    return <ListPostLoading />;
  }

  return (
    <div className="xl:h-[85vh] overflow-y-scroll no-scrollbar my-5 rounded-lg">
      <div className="flex flex-col gap-4">
        {!isLoading &&
          postItems &&
          postItems.length > 0 &&
          postItems.map((post: any) => post)}

        {/* load more */}
        {posts?.next &&
          (isLoading ? (
            <button
              className="border text-blue-500 border-blue-500 p-4 rounded-lg flex gap-2 items-center justify-center"
              disabled
            >
              <Loader2 size={20} className="animate-spin" />
              <span>Loading More Posts...</span>
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white p-4 rounded-lg"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load More
            </button>
          ))}
      </div>
    </div>
  );
}
