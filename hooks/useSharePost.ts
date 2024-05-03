import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";

export default function useSharePost() {
  const token = useGetAuthToken();

  const { mutate: createSharePost } = useMutation({
    mutationKey: ["createSharePost"],
    mutationFn: async ({
      id,
      share_content
    }: {
      id?: number;
      share_content: string;
    }) => {
      const response = await fetch(`${API_URL}/api/posts/${id}/share/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        },
        body: JSON.stringify({
          share_content
        })
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data);
      }
    }
  });

  return { createSharePost };
}
