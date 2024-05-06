import { useToast } from "@/components/ui/use-toast";
import useGetAuthToken from "./useGetAuthToken";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constant/api";
import { useState } from "react";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useLikeSharedPost() {
  const [likeSharedPostLoading, setLikeSharedPostLoading] = useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: likeSharedPost } = useMutation({
    mutationKey: ["like-shared-post"],
    mutationFn: async (postId: number) => {
      try {
        setLikeSharedPostLoading(true);
        const response = await fetch(
          `${API_URL}/api/posts/${postId}/share/like/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast({
            title: "Error",
            description: data.message,
            variant: "destructive"
          });
          setLikeSharedPostLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setLikeSharedPostLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setLikeSharedPostLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      });
    }
  });

  return { likeSharedPost, likeSharedPostLoading };
}
