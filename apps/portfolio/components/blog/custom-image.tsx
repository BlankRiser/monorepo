import React from "react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: string;
  width?: number;
  height?: number;
}

export function CustomImage({
  src,
  alt = "",
  caption,
  width,
  height,
  className,
  ...props
}: CustomImageProps) {
  if (!src) return null;

  const srcString = typeof src === "string" ? src : "";

  return (
    <figure className="my-8 overflow-hidden">
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        {width && height && srcString ? (
          <Image
            src={srcString}
            alt={alt}
            width={width}
            height={height}
            className={cn("h-auto w-full object-cover", className)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcString}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={cn("h-auto w-full object-cover", className)}
            {...props}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
