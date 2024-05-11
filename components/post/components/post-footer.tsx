import ProfileImageComponent from "@/components/profile-image/profile-image";
import SharePostModal from "@/components/share-post/modal/share-post-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCreateCommentForPost from "@/hooks/useCreateCommentForPost";
import useGetProfileByUser from "@/hooks/useGetProfileByUser";
import useLikePostById from "@/hooks/useLikePostById";
import useUnlikePostById from "@/hooks/useUnlikePostById";
import { Loader2, MessageSquareMore, Send, ThumbsUp } from "lucide-react";
import React, { useEffect } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

type Props = {
  id?: number;
  contents: any;
  isShared?: boolean;
};

export default function PostFooterComponent({ id, contents }: Props) {
  const { profile } = useGetProfileByUser();
  const [postId, setPostId] = React.useState<number | null>(
    id as number | null
  );
  const [comment, setComment] = React.useState<string>("");

  const { likePostById } = useLikePostById();
  const { unlikePostById } = useUnlikePostById();
  const { createCommentForPost, commentLoading } = useCreateCommentForPost();
  useEffect(() => {
    console.log("POST ID", contents);
    console.log("PROFILE", profile);
  }, [contents, profile]);

  return (
    <div className="block">
      {contents?.likes?.length > 0 && (
        <div className="flex items-center gap-2 text-blue-600">
          <AiFillLike size={16} />
          <p className="text-sm font-medium">{contents?.likes?.length}</p>
        </div>
      )}
      <div className="flex items-center gap-10">
        <div
          className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            if (contents?.likes?.length > 0) {
              const liked = contents?.likes.find((user: any) => {
                return user?.id === profile?.id;
              });

              if (liked) {
                unlikePostById({ id: id as number });
              } else {
                likePostById({ id: id as number });
              }
            } else {
              likePostById({ id: id as number });
            }
          }}
        >
          {contents?.likes?.length > 0 &&
          contents?.likes.find((user: any) => {
            return user?.id === profile?.id;
          }) ? (
            <AiFillLike size={16} className="text-blue-600" />
          ) : (
            <AiOutlineLike size={16} className="text-blue-600" />
          )}

          <p className="text-sm font-medium">Like</p>
        </div>
        <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
          <MessageSquareMore size={16} className="text-blue-600" />
          <p className="text-sm font-medium">Comment</p>
        </div>

        <SharePostModal
          contents={contents}
          trigger={
            <div
              className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => setPostId(id as number)}
            >
              <FaShare size={16} className="text-blue-600" />
              <p className="text-sm font-medium">Share</p>
            </div>
          }
          id={postId as number}
        />
      </div>

      <div className="flex justify-between items-center gap-3 mt-5 mb-3">
        <ProfileImageComponent
          image={profile?.profile_picture}
          className="w-10 h-10"
          imageClassName="rounded-full w-full h-full object-cover"
        />

        <form action="" className="w-full flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full px-6 py-2 border border-gray-300 rounded-full"
            onChange={(e) => setComment(e.target.value)}
          />
          {commentLoading ? (
            <button
              className="bg-blue-600 px-6 rounded-full disabled:opacity-50"
              disabled
            >
              <Loader2 size={24} className="text-white animate-spin" />
            </button>
          ) : (
            <button
              className="bg-blue-600 px-6 rounded-full"
              onClick={() => {
                createCommentForPost(
                  { postId: id as number, comment },
                  {
                    onSuccess: () => {
                      setComment("");
                    }
                  }
                );
              }}
            >
              <Send size={24} className="text-white" />
            </button>
          )}
        </form>
      </div>

      {contents?.comments?.length > 0 && (
        <div className="flex flex-col py-2 space-y-2">
          {/* <div className="flex items-center gap-2">
            <ProfileImageComponent
              image={contents?.comments[0]?.user?.profile_picture}
              className="w-8 h-8"
              imageClassName="rounded-full w-full h-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-md">{contents?.comments[0]?.comment}</p>
            </div>
          </div> */}
          <div className="flex flex-col gap-1 text-blue-500 underline cursor-pointer">
            <p className="text-md">
              View all {contents?.comments?.length}{" "}
              {contents?.comments?.length > 1 ? "comments" : "comment"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
