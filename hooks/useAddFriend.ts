import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useAddFriend() {
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: addFriend } = useMutation({
    mutationKey: ["add-friend"],
    mutationFn: async (friendId: number | undefined) => {
      try {
        setAddFriendLoading(true);
        const response = await fetch(
          `${API_URL}/api/users/add-friend/${friendId}/`,
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
          setAddFriendLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setAddFriendLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setAddFriendLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friend-requests"]
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"]
      });

      queryClient.invalidateQueries({
        queryKey: ["friends"]
      });

      queryClient.invalidateQueries({
        queryKey: ["profile-username"]
      });
    }
  });

  return { addFriend, addFriendLoading };
}
