"use client";
import { CldImage } from "next-cloudinary";

interface OptimizedImageProps {
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  quality?: number;
  format?: "auto" | "png" | "jpg" | "webp";
  loading?: "lazy" | "eager";
}

export default function CloudImage({
  className,
  width,
  height,
  src,
  alt,
  ...props
}: OptimizedImageProps) {
  return (
    <CldImage
      className={className}
      width={width}
      height={height}
      src={src}
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
}
