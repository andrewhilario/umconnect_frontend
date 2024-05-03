"use client";

import React from "react";
import ProfilePageById from "./[id]/page";
import { useSelectedEmoji } from "@/components/emoji-picker/emoji-picker";

type Props = {};

export default function ProfilePage({}: Props) {
  const { selectedEmoji, setSelectedEmoji } = useSelectedEmoji();
  return (
    <div>
      <ProfilePageById />
    </div>
  );
}
