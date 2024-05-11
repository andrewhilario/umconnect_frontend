"use client";

import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthToken from "./useGetAuthToken";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function useGetAllNotifications() {
  const token = useGetAuthToken();
  const { toast } = useToast();

  const isShown =
    typeof window !== undefined ? localStorage.getItem("isShown") : false;

  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/notifications/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      if (response.ok) {
        if (data.results?.length > 0 && data.results?.[0].is_read === false) {
          const latestNotification = data?.results?.[0];
          if (latestNotification && !isShown) {
            if (typeof window !== undefined)
              localStorage.setItem("isShown", "true");
            toast({
              title: latestNotification.title,
              description: latestNotification.message,
              variant: "notifications",
              duration: 5000
            });
          }
        }

        return data;
      }
    }
  });

  useEffect(() => {
    // if the notification is not read show the toast notification then once only
  }, [notifications]);

  return { notifications, notificationsLoading };
}
