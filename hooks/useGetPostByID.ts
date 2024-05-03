import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";

export default function useGetPostByID(id: number) {
  const token = useGetAuthToken();

  const { data: getPostById, isLoading: getPostByIdLoading } = useQuery({
    queryKey: ["getPostById"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/posts/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
  });

  return { getPostById, getPostByIdLoading };
}
