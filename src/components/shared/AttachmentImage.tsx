"use client";

import { XIcon } from "lucide-react";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";

export interface ImageProps {
  name: string;
  meta: string;
  src: string;
  alt: string;
}

interface AttachmentImageProps {
  images: ImageProps[];
  onRemove?: (index: number) => void;
}

const AttachmentImage = ({ images, onRemove }: AttachmentImageProps) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full py-1">
      <AttachmentGroup className="w-full space-y-2">
        {images.map((image, index) => (
          <Attachment
            key={`${image.name}-${index}`}
            orientation="horizontal"
            className="bg-surface-container-lowest border-border flex items-center justify-between rounded-xl border p-3 shadow-xs"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <AttachmentMedia variant="image" className="border-border relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border bg-surface-container">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </AttachmentMedia>
              <AttachmentContent className="flex flex-col truncate">
                <AttachmentTitle className="text-on-surface truncate font-semibold text-sm">
                  {image.name}
                </AttachmentTitle>
                <AttachmentDescription className="text-on-surface-variant text-xs">
                  {image.meta}
                </AttachmentDescription>
              </AttachmentContent>
            </div>

            {onRemove && (
              <AttachmentActions className="ml-2 shrink-0">
                <AttachmentAction
                  type="button"
                  aria-label={`Remove ${image.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemove(index);
                  }}
                  className="text-on-surface-variant hover:bg-destructive/10 hover:text-destructive flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                >
                  <XIcon className="h-4 w-4" />
                </AttachmentAction>
              </AttachmentActions>
            )}
          </Attachment>
        ))}
      </AttachmentGroup>
    </div>
  );
};

export default AttachmentImage;
