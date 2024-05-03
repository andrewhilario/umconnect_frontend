import { useQuery } from "@tanstack/react-query";
import {
  Baby,
  Component,
  CupSoda,
  Dog,
  Flag,
  Loader2,
  Medal,
  Plane,
  Shirt,
  Smile,
  SmileIcon,
  TrafficCone,
  User
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";

import useGetAllEmoji from "./hooks/useGetAllEmoji";
import useGetEmojiCategory from "./hooks/useGetEmojiCategory";
import { items } from "./constants/emoji-category";
import React, { useEffect, useState } from "react";
import useGetEmojiInCategory from "./hooks/useGetEmojiInCategory";
import { cn } from "@/lib/utils";

const iconComponents: { [key: string]: React.ComponentType<any> } = {
  Smile,
  User,
  Dog,
  CupSoda,
  Plane,
  Medal,
  Shirt,
  TrafficCone,
  Flag
};

export default function EmojiPickerComponent({
  className,
  onClick
}: {
  className?: string;
  onClick?: () => void;
}) {
  const { emojis, isLoading, error } = useGetAllEmoji();
  const [category, setCategory] = useState("smileys-emotion");
  const { selectedEmoji, setSelectedEmoji } = useSelectedEmoji();

  const { emojiCategory, emojiCategoryLoading, emojiCategoryError } =
    useGetEmojiCategory();

  const { emojiOnCategory, emojiOnCategoryLoading, emojiOnCategoryError } =
    useGetEmojiInCategory({ category });

  useEffect(() => {
    console.log("Category: " + category);
    console.log("Emojis in Category: ", emojiOnCategory);
  }, [category, emojiOnCategory]);

  if (isLoading && emojiCategoryLoading && emojiOnCategoryLoading) {
    return (
      <div className={cn("p-2 border-2 border-gray-200 rounded-lg", className)}>
        <Loader2 size={24} className="text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div
            className={cn(
              "p-2 border-2 border-gray-200 rounded-lg cursor-pointer",
              className
            )}
            onClick={() => console.log("Emoji Picker", emojiCategory)}
          >
            <Smile size={24} className="text-blue-600" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px]">
          <Carousel>
            <CarouselContent className="px-10 w-[300px]">
              {items?.map((itemName, index) => {
                const IconComponent = iconComponents[itemName.item];
                if (!IconComponent) return null;

                return (
                  <CarouselItem
                    className="basis-1/7 z-50 cursor-pointer"
                    key={index}
                    onClick={() => setCategory(itemName.label)}
                  >
                    <IconComponent size={24} className="text-blue-600" />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
          </Carousel>
          <hr className="my-2 border-gray-500" />
          <ScrollArea
            className="h-[300px] overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {emojiOnCategoryLoading && (
              <div className="p-2 border-2 border-gray-200 rounded-lg flex items-center justify-center gap-2">
                <Loader2 size={24} className="text-blue-600 animate-spin" />
                <p className="text-blue-600">
                  Loading emojis in category {category}
                </p>
              </div>
            )}

            <div className="grid grid-cols-8 gap-2">
              {emojiOnCategory?.map((emoji: any) => {
                return (
                  <div
                    key={emoji.codePoint}
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 "
                    onClick={() => setSelectedEmoji(emoji.character)}
                    onChange={() => setSelectedEmoji(emoji.character)}
                  >
                    <p>{emoji.character}</p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}

export const useSelectedEmoji = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  useEffect(() => {
    console.log("Selected Emoji: ", selectedEmoji); // Log the selected emoji
  }, [selectedEmoji]);

  return { selectedEmoji, setSelectedEmoji };
};
