"use client";

import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar as AvatarUi, AvatarFallback } from "@/components/ui/avatar";
import SmartImage from "@/components/shared/SmartImage";
import type { User } from "better-auth";

interface AvatarProps extends Pick<User, "name" | "image"> {
  className?: string;
  fallbackClassName?: string;
}

const Avatar = ({
  name,
  image,
  className = "h-9 w-9",
  fallbackClassName,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AvatarUi className={cn("relative", className)}>
      {image && !imageError ? (
        <SmartImage
          src={image}
          alt={name}
          className="object-cover"
          fill
          quality={100}
          sizes="140px"
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback className={fallbackClassName}>
          {getInitials(name)}
        </AvatarFallback>
      )}
    </AvatarUi>
  );
};

export default Avatar;
