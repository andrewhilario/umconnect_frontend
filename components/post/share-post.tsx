"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import PostHeaderComponent from "./components/post-header";
import PostFooterComponent from "./components/post-footer";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Post from "./post";

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
  }, [contents]);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
      <PostHeaderComponent
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
      <PostFooterComponent
        id={contents.id}
        contents={contents}
        isShared={true}
      />
    </div>
  );
}
