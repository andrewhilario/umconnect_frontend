"use client";

import React, { useEffect, useMemo, useState } from "react";
import Post from "./post";
import { images } from "@/constant/images";
import useGetAllPosts from "@/hooks/useGetAllPosts";
import SharePost from "./share-post";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ListPostLoading from "./components/list-post-loading";
import InfiniteScroll from "react-infinite-scroll-component";

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

  const fetchMorePosts = () => {
    if (!isLoading && posts?.next) {
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return <ListPostLoading />;
  }

  return (
    <div className="xl:h-[85vh] overflow-y-scroll no-scrollbar my-5 rounded-lg">
      <InfiniteScroll
        dataLength={postings.length}
        next={fetchMorePosts}
        hasMore={!!posts?.next}
        loader={<ListPostLoading />}
        endMessage={
          <p className="mt-10 text-blue-600 text-center">
            <b>Yay! You have seen it all 🎉</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        <div className="flex flex-col gap-4">
          {postItems &&
            postItems.length > 0 &&
            postItems.map((post: any) => post)}
        </div>
      </InfiniteScroll>
    </div>
  );
}
