import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useState } from "react";

export default function useCreateStory() {
  const [createLoading, setCreateLoading] = useState(false);
  const token = useGetAuthToken();

  const { mutate: createStory } = useMutation({
    mutationKey: ["createStory"],
    mutationFn: async (storyData: any) => {
      try {
        setCreateLoading(true);

        const formData = new FormData();
        formData.append("story", storyData.story);

        const response = await fetch(`${API_URL}/api/stories/create/`, {
          method: "POST",
          headers: {
            Authorization: `${token}`
          },
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          setCreateLoading(false);
          throw new Error(data.message);
        }

        if (response.ok) {
          setCreateLoading(false);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  return { createStory, createLoading };
}
