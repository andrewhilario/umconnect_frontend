import { API_URL } from "@/constant/api";
import useGetAuthToken from "./useGetAuthToken";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export default function useUpdateProfile() {
  const token = useGetAuthToken();
  const { toast } = useToast();

  const { mutate: updateProfile } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (data: any) => {
      const response = await fetch(`${API_URL}/api/users/update/`, {
        method: "PATCH",
        headers: {
          Authorization: token
        },
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        if (result.error) {
          toast({
            title: "Opps!",
            description: result.error,
            variant: "destructive"
          });
          return result;
        } else {
          toast({
            title: "Success!",
            description: "Profile updated successfully",
            variant: "default"
          });
          return result;
        }
      } else {
        toast({
          title: "Oops!",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        });
      }
    }
  });

  return { updateProfile };
}
