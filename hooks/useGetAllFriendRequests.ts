import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";

export default function useGetAllFriendRequests() {
  const token = useGetAuthToken();

  const {
    data: friendRequests,
    isLoading: friendRequestLoading,
    error
  } = useQuery({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/users/friend-requests`, {
        headers: {
          Authorization: `${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
  });

  return { friendRequests, friendRequestLoading, error };
}
