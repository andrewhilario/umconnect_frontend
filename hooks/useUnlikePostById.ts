import { API_URL } from "@/constant/api";
import { QueryClient, useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { queryClient } from "@/components/tanstack-provider/provider";

export default function useUnlikePostById() {
  const token = useGetAuthToken();
  const { mutate: unlikePostById } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const response = await fetch(`${API_URL}/api/posts/${id}/unlike/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      });

      if (response.ok) {
        return null;
      } else {
        throw new Error("Failed to unlike post");
      }
    },
    onSuccess: () => {
      console.log("Mutation successful! Invalidating query cache...");
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      });
    }
  });

  return { unlikePostById };
}
