import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { useSession } from "next-auth/react";

export default function useGetFriendLists() {
  const token = useGetAuthToken();
  const { data: session } = useSession();

  const {
    data: friends,
    isLoading,
    error
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/users/friends/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || `Bearer ${session?.token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    }
  });

  return { friends, isLoading, error };
}
