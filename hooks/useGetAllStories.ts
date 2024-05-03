import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllStories() {
  const { data: getAllStories, isLoading: loadingStories } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/stories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("An error occurred while fetching stories");
      }

      if (response.ok) {
        return data;
      }
    }
  });

  return { getAllStories, loadingStories };
}
