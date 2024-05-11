import { useSession } from "next-auth/react";

export default function useGetAuthToken() {
  const { data: session } = useSession();

  return `Bearer ${session!.token}`;
}
