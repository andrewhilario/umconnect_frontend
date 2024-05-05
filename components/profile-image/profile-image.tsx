import { Avatar, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  image: string;
  className?: string;
  imageClassName?: string;
};

export default function ProfileImageComponent({
  image,
  className,
  imageClassName
}: Props) {
  return (
    <Avatar className={cn("z-10", className)}>
      <AvatarImage
        src={image ?? "/images/default.png"}
        alt="Profile Image"
        className={cn("object-cover", imageClassName)}
      />
    </Avatar>
  );
}
