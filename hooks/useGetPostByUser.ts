import { UsersPosts } from "@/types/users-post";
import useGetAuthToken from "./useGetAuthToken";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/constant/api";

export default function useGetPostByUser() {
  const token = useGetAuthToken();

  const {
    data: userPosts,
    error: userPostsError,
    isLoading: userPostsLoading
  } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/posts/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
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

  return { userPosts, userPostsError, userPostsLoading };
}
