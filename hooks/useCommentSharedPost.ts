import { useState } from "react";
import useGetAuthToken from "./useGetAuthToken";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constant/api";

type Props = {
  postId: number;
  comment: string;
};

export default function useCommentSharedPost() {
  const [commentSharedPostLoading, setCommentSharedPostLoading] =
    useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: commentSharedPost } = useMutation({
    mutationKey: ["comment-shared-post"],
    mutationFn: async ({ postId, comment }: Props) => {
      try {
        setCommentSharedPostLoading(true);
        const response = await fetch(
          `${API_URL}/api/posts/${postId}/share/comment/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`
            },
            body: JSON.stringify({ share_comment: comment })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast({
            title: "Error",
            description: data.message,
            variant: "destructive"
          });
          setCommentSharedPostLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setCommentSharedPostLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setCommentSharedPostLoading(false);
      }
    }
  });

  return { commentSharedPost, commentSharedPostLoading };
}
