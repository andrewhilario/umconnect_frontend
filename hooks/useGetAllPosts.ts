"use client";

import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllPosts() {
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/posts/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
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

  return { posts, isLoading, error };
}
