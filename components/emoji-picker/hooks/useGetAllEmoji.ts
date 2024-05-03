import { useQuery } from "@tanstack/react-query";

export default function useGetAllEmoji() {
  const API_KEY = "4649556a20bcf173d76880aed9724a1e250ec7ea";
  const baseUrl = "https://emoji-api.com";

  const {
    data: emojis,
    isLoading,
    error
  } = useQuery({
    queryKey: ["emoji", API_KEY],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/emojis?access_key=${API_KEY}`, {
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

  return {
    emojis,
    isLoading,
    error
  };
}
