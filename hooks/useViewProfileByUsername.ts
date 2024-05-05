import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { useParams } from "next/navigation";

export default function useViewProfileByUsername() {
  const { username } = useParams();
  const token = useGetAuthToken();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError
  } = useQuery({
    queryKey: ["profile-username", username],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/users/user/${username}/`, {
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

  return { profile, profileLoading, profileError };
}
