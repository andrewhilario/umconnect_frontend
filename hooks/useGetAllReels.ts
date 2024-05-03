import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllReels() {
  const { data: getAllResls, isLoading: getAllReelsLoading } = useQuery({
    queryKey: ["getAllReels"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/reels/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error fetching reels");
      }

      if (response.ok) {
        return data;
      }
    }
  });

  return { getAllResls, getAllReelsLoading };
}
