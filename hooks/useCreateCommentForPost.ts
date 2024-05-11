import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function useCreateCommentForPost() {
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const token = useGetAuthToken();
  const { toast } = useToast();
  const { mutate: createCommentForPost } = useMutation({
    mutationKey: ["create-comment-for-post"],
    mutationFn: async (commentData: any) => {
      try {
        setCommentLoading(true);
        const response = await fetch(
          `${API_URL}/api/posts/${commentData.postId}/comment/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`
            },
            body: JSON.stringify({ comment: commentData.comment })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast({
            title: "Error",
            description: data.message,
            variant: "destructive"
          });
          setCommentLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setCommentLoading(false);
          return data;
        }

        setCommentLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setCommentLoading(false);
      }
    }
  });

  return { createCommentForPost, commentLoading };
}
