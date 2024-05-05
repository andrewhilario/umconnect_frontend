import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useRemoveFriendRequest() {
  const [removeFriendReqLoading, setRemoveFriendReqLoading] = useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: removeFriendRequest } = useMutation({
    mutationKey: ["remove-friend-request"],
    mutationFn: async (friendId: number | undefined) => {
      try {
        setRemoveFriendReqLoading(true);
        const response = await fetch(
          `${API_URL}/api/users/remove-friend-request/${friendId}/`,
          {
            method: "DELETE",
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
          setRemoveFriendReqLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setRemoveFriendReqLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setRemoveFriendReqLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-username"]
      });
    }
  });

  return { removeFriendRequest, removeFriendReqLoading };
}
