"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import PostHeaderComponent from "./components/post-header";
import PostFooterComponent from "./components/post-footer";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Post from "./post";
import SharePostHeaderComponent from "../share-post/components/share-post-header";
import SharePostFooterComponent from "../share-post/components/share-post-footer";

type Props = {
  contents: {
    id: number;
    content: string;
    post_image: any;
    created_at: string;
    post_type: string;
  };
  share: any;
  user: {
    id: any;
    first_name: string;
    last_name: string;
    profile_picture: string;
    username: string;
  };
};

export default function SharePost({ contents, user, share }: Props) {
  const router = useRouter();
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    if (contents?.post_image) {
      const images = JSON.parse(contents?.post_image);
      setImages(images);
    }
    console.log("SHARE", contents);
  }, [contents]);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
      <SharePostHeaderComponent
        {...share?.user}
        timestamp={formatDistanceToNow(share.created_at, {
          addSuffix: true
        })}
        onClick={() => {
          router.push(`/profile/${user.id}`);
        }}
      />
      <p className="text-sm">{share.share_content}</p>
      <div className="p-2 border rounded-lg border-gray-500">
        <Post contents={contents} user={user} is_shared={true} />
      </div>
      <SharePostFooterComponent id={contents.id} contents={contents} />
    </div>
  );
}
