import { useQuery } from "@tanstack/react-query";

export default function useGetEmojiCategory() {
  const API_KEY = "4649556a20bcf173d76880aed9724a1e250ec7ea";
  const baseUrl = "https://emoji-api.com";
  const {
    data: emojiCategory,
    isLoading: emojiCategoryLoading,
    error: emojiCategoryError
  } = useQuery({
    queryKey: ["emojiCategory", API_KEY],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/categories?access_key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    }
  });

  return {
    emojiCategory,
    emojiCategoryLoading,
    emojiCategoryError
  };
}
