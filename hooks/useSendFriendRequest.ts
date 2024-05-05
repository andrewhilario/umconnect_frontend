import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useSendFriendRequest() {
  const [sendFriendReqLoading, setSendFriendReqLoading] = useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: sendFriendRequest } = useMutation({
    mutationKey: ["send-friend-request"],
    mutationFn: async (friendId: number) => {
      try {
        setSendFriendReqLoading(true);
        const response = await fetch(
          `${API_URL}/api/users/send-friend-request/${friendId}/`,
          {
            method: "POST",
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
          setSendFriendReqLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setSendFriendReqLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setSendFriendReqLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-username"]
      });
    }
  });

  return { sendFriendRequest, sendFriendReqLoading };
}
