"use client";
import { API_URL } from "@/constant/api";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useUpdateAuthToken() {
  const { data: session } = useSession();

  const { mutate: updateToken } = useMutation({
    mutationKey: ["updateToken"],
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/api/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refresh: session!.refresh_token
        })
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    },
    onSuccess: (data) => {
      const decode = jwtDecode(data.access) as User;
      session!.token = data.access;
      session!.access_token = data.access;
      session!.refresh_token = data.refresh;

      console.log("TOKEN UPDATED", session);

      return session;
    }
  });

  return { updateToken };
}
