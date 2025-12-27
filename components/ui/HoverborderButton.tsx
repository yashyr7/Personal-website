"use client";
import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { cn } from "@/utils/cn";

export function HoverBorderButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div className={cn("m-10 flex justify-center text-center", className)}>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        onClick={onClick}
      >
        <span>Ask Me Anything 💬</span>
      </HoverBorderGradient>
    </div>
  );
}
