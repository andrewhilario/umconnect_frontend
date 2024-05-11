"use client";

import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useGetAllPosts() {
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      let pageQuery;
      if (page > 1) {
        pageQuery = `?page=${page}`;
      } else {
        pageQuery = "";
      }

      const response = await fetch(`${API_URL}/api/posts/${pageQuery}`, {
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

  return { posts, isLoading, error, setPage, page };
}
