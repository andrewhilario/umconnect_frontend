import { API_URL } from "@/constant/api";
import { useMutation } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function useCreatePost() {
  const token = useGetAuthToken();
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: createPost } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (data: any) => {
      setCreatePostLoading(true);
      const response = await fetch(`${API_URL}/api/posts/create/`, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: data
      });

      const res = await response.json();

      if (response.ok) {
        if (res.error) {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive"
          });
        }
        setCreatePostLoading(false);
        toast({
          title: "Error",
          description: "Post created successfully",
          variant: "default"
        });
        return res;
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive"
        });
        setCreatePostLoading(false);
      }
    }
  });
  return {
    createPost,
    createPostLoading
  };
}
