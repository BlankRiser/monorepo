import React from "react";
import Image from "next/image";
import { cn } from "@workspace/ui/lib/utils";

export interface CustomImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  caption?: string;
  width?: number | string;
  height?: number | string;
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
  const numericWidth =
    typeof width === "number"
      ? width
      : typeof width === "string" && !Number.isNaN(Number(width))
        ? Number(width)
        : undefined;
  const numericHeight =
    typeof height === "number"
      ? height
      : typeof height === "string" && !Number.isNaN(Number(height))
        ? Number(height)
        : undefined;

  return (
    <figure className="my-8 overflow-hidden">
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        {numericWidth && numericHeight && srcString ? (
          <Image
            src={srcString}
            alt={alt}
            width={numericWidth}
            height={numericHeight}
            className={cn("h-auto w-full object-cover", className)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={srcString}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={width}
            height={height}
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
