"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect } from "react";
import PostHeaderComponent from "./components/post-header";
import PostFooterComponent from "./components/post-footer";
import { useRouter } from "next/navigation";

type Props = {
  contents: {
    content: string;
    post_image: any;
  };
  user: {
    id: any;
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
};

export default function Post({ contents, user }: Props) {
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
        {...user}
        onClick={() => {
          router.push(`/profile/${user.id}`);
        }}
      />
      <p className="text-sm">{contents.content}</p>
      <div
        className={`${
          images?.length! > 2
            ? "grid grid-cols-2"
            : images?.length! > 3
            ? "grid grid-cols-4"
            : "flex flex-wrap"
        } gap-4`}
      >
        {images?.length! > 0 &&
          images?.map((image, index) => {
            if (images?.length! > 2 && images?.length! < 4) {
              if (index === 0) {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="post"
                    className="w-full col-span-2 object-cover rounded-lg"
                  />
                );
              } else {
                return (
                  <img
                    key={index}
                    src={image}
                    alt="post"
                    className="w-full h-full object-cover rounded-lg"
                  />
                );
              }
            } else {
              return (
                <img
                  key={index}
                  src={image}
                  alt="post"
                  className="w-full h-96 object-cover rounded-lg"
                />
              );
            }
          })}
      </div>
      <PostFooterComponent />
    </div>
  );
}
