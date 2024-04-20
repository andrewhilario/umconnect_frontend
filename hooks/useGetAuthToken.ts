import { useSession } from "next-auth/react";

export default function useGetAuthToken() {
  const { data: session } = useSession();

  if (!session) {
    throw new Error("No session found");
  }

  return `Bearer ${session!.token}`;
}
