"use client";
import { API_URL } from "@/constant/api";
import useGetAuthToken from "./useGetAuthToken";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useUpdateNotification() {
  const token = useGetAuthToken();
  const { toast } = useToast();
  const { mutate: updateNotification } = useMutation({
    mutationKey: ["update-notification"],
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/api/notifications/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error ?? "An error occurred",
          variant: "destructive"
        });
        throw new Error(data.error);
      }

      if (response.ok) {
        toast({
          title: "Notification Updated",
          description: data?.message,
          variant: "default"
        });
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"]
      });
    }
  });

  return { updateNotification };
}
