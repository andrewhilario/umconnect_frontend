import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { API_URL } from "@/constant/api";
import { useState } from "react";

export default function useCreateReels() {
  const [createLoading, setCreateLoading] = useState(false);
  const { toast } = useToast();
  const token = useGetAuthToken();
  const { mutate: createReel } = useMutation({
    mutationKey: ["createReel"],
    mutationFn: async (data: any) => {
      try {
        setCreateLoading(true);
        const formData = new FormData();

        formData.append("reel_video", data.reel_video);
        formData.append("reel_caption", data.reel_caption);

        const response = await fetch(`${API_URL}/api/reels/create/`, {
          method: "POST",
          headers: {
            Authorization: `${token}`
          },
          body: formData
        });

        const result = await response.json();

        if (!response.ok) {
          toast({
            title: "Error",
            description: "Error creating reel",
            variant: "destructive"
          });
          setCreateLoading(false);
        }

        if (response.ok) {
          toast({
            title: "Success",
            description: "Reel created successfully",
            variant: "default"
          });
          setCreateLoading(false);
          return result;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Error creating reel",
          variant: "destructive"
        });
        setCreateLoading(false);
      }
    }
  });

  return { createReel, createLoading };
}
