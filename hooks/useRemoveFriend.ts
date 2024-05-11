import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/constant/api";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import useGetAuthToken from "./useGetAuthToken";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useRemoveFriend() {
  const [removeFriendLoading, setRemoveFriendLoading] = useState(false);
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: removeFriend } = useMutation({
    mutationKey: ["remove-friend"],
    mutationFn: async (friendId: number | undefined) => {
      try {
        setRemoveFriendLoading(true);
        const response = await fetch(
          `${API_URL}/api/users/add-friend/${friendId}/`,
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
            description: data.error,
            variant: "destructive"
          });
          setRemoveFriendLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: data.message,
            variant: "success"
          });
          setRemoveFriendLoading(false);
          return data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: String(error),
          variant: "destructive"
        });
        setRemoveFriendLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  });

  return { removeFriend, removeFriendLoading };
}
