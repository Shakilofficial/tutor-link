"use client";

import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { motion } from "framer-motion";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1], // Expands slightly and returns
        opacity: [0.8, 1, 0.8], // Fades in and out
      }}
      transition={{
        duration: 2, // Smooth transition time
        ease: "easeInOut",
        repeat: Infinity, // Infinite animation
      }}
      className="relative p-[4px] rounded-full bg-gradient-to-br from-orange-400/40 to-orange-600/40 shadow-md"
    >
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-orange-500 shadow-md",
          className
        )}
        {...props}
      />
    </motion.div>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-orange-300 flex size-full items-center justify-center rounded-full text-orange-700 font-semibold uppercase",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
