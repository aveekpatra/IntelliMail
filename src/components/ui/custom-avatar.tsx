"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Simple replacement for react-avatar
type CustomAvatarProps = {
  name?: string;
  email?: string;
  size?: string | number;
  round?: boolean | string;
  color?: string;
  className?: string;
  fgColor?: string;
  src?: string;
  alt?: string;
  [key: string]: any;
};

export default function CustomAvatar({
  name,
  email,
  size = "40",
  round = true,
  color,
  className = "",
  fgColor = "white",
  src,
  alt,
  ...rest
}: CustomAvatarProps) {
  // Get initials from name or email
  const getInitials = () => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return "?";
  };

  const initials = getInitials();
  const sizeInPx = typeof size === "number" ? `${size}px` : size;
  const bgColor = color || `hsl(${Math.floor(Math.random() * 360)}, 65%, 45%)`;

  const style = {
    width: sizeInPx,
    height: sizeInPx,
    borderRadius:
      round === true ? "50%" : typeof round === "string" ? round : "0",
    backgroundColor: bgColor,
    color: fgColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: `calc(${sizeInPx} * 0.4)`,
    ...rest.style,
  };

  return (
    <Avatar className={className} style={style} {...rest}>
      {src && <AvatarImage src={src} alt={alt || name || email || "Avatar"} />}
      <AvatarFallback style={{ backgroundColor: bgColor, color: fgColor }}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
