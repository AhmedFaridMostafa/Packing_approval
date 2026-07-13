"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Maximize2 } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  src: string;
  alt: string;
  desc: string | null;
}

const Lightbox = ({ src, alt, desc }: LightboxProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon-lg"
          variant="secondary"
          className="absolute top-3 right-3 flex items-center justify-center"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-surface max-w-[90vw] border-none p-0 shadow-none sm:max-w-[85vw] md:max-w-[75vw]">
        <VisuallyHidden>
          <DialogTitle>{alt}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </VisuallyHidden>

        <AspectRatio ratio={16 / 9}>
          <SmartImage
            src={src}
            alt={alt}
            fill
            sizes="(max-w-768px) 90vw, 75vw"
            className="object-contain"
            fetchPriority="high"
          />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};

export default Lightbox;
