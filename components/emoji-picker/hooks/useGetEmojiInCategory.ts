import { useQuery } from "@tanstack/react-query";

type Props = {
  category: string;
};

export default function useGetEmojiInCategory({ category }: Props) {
  const API_KEY = "4649556a20bcf173d76880aed9724a1e250ec7ea";
  const baseUrl = "https://emoji-api.com";

  const {
    data: emojiOnCategory,
    isLoading: emojiOnCategoryLoading,
    error: emojiOnCategoryError
  } = useQuery({
    queryKey: ["emojiOnCategory", API_KEY, category],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}/categories/${category}?access_key=${API_KEY}`,
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
    emojiOnCategory,
    emojiOnCategoryLoading,
    emojiOnCategoryError
  };
}
