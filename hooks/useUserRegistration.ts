import { API_URL } from "@/constant/api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export default function useUserRegistration() {
  const { toast } = useToast();

  const { mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: any) => {
      const registration_data = {
        email: data.email,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        phone_number: data.phone_number,
        password: data.password
      };

      const response = await fetch(`${API_URL}/api/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registration_data)
      });

      const response_data = await response.json();

      if (response.ok) {
        console.log("RESPONSE", response_data);
        toast({
          title: "Registration Successful",
          description: "You have successfully registered"
        });

        return response_data;
      } else {
        throw new Error(response_data.error);
      }
    },
    onSuccess: (data) => {
      console.log("REGISTERED", data);
    },
    onError: (error) => {
      console.error("ERROR", error);
    }
  });

  return { register };
}
