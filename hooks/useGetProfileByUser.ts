import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function useGetProfileByUser() {
  const { id } = useParams();
  const token = useGetAuthToken();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      let response;
      if (id === undefined) {
        response = await fetch(`${API_URL}/api/users/me/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        });
      } else {
        response = await fetch(`${API_URL}/api/users/user/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        });
      }

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
