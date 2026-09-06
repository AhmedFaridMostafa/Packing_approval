"use client";

import {
  cn,
  formatFileSize,
  truncateFileName,
} from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import AttachmentImage, { ImageProps } from "./AttachmentImage";
import { CloudUpload, ImagePlus } from "lucide-react";
import { DEFAULT_ACCEPT, MAX_FILE_SIZE } from "@/constants";
import useObjectUrl from "@/hooks/useObjectUrl";

interface FileUploaderLabels {
  uploadText: string;
  dropText: string;
  replaceText: string;
  placeholder: string;
}

interface FileUploaderProps {
  id?: string;
  value?: File;
  disabled?: boolean;
  accept?: Accept;
  maxSize?: number;
  labels: FileUploaderLabels;
  ariaInvalid?: boolean;
  onChange: (file: File | undefined) => void;
  onDropRejected?: (rejections: FileRejection[]) => void;
}

const FileUploader = ({
  id,
  ariaInvalid,
  labels: { uploadText, dropText, replaceText, placeholder },
  value,
  disabled,
  accept = DEFAULT_ACCEPT,
  onChange,
  onDropRejected,
  maxSize = MAX_FILE_SIZE,
}: FileUploaderProps) => {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      onChange(file);
    },
    [onChange],
  );

  const handleRemove = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleDropRejected = useCallback(
    (rejections: FileRejection[]) => {
      onDropRejected?.(rejections);
    },
    [onDropRejected],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept,
      disabled,
      multiple: false,
      maxSize,
      onDrop: handleDrop,
      onDropRejected: handleDropRejected,
    });

  const src = useObjectUrl(value);
  const imagePreview: ImageProps[] = useMemo(() => {
    if (!value) return [];

    return [
      {
        name: truncateFileName(value.name),
        meta: `${value.type.split("/")[1]?.toUpperCase() || "FILE"} · ${formatFileSize(value.size)}`,
        src: src!,
        alt: value.name,
      },
    ];
  }, [value, src]);

  return (
    <div className="w-full">
      <div
        {...getRootProps({ "aria-invalid": ariaInvalid || isDragReject })}
        className={cn(
          "bg-surface-container-low border-border relative flex min-h-35 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition-all duration-200",
          "hover:border-primary/50 hover:bg-surface-container-low/80",
          "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2",
          isDragActive &&
            !isDragReject &&
            "border-primary bg-primary/5 scale-[1.01]",
          isDragReject && "border-destructive bg-destructive/5",
          ariaInvalid && "border-destructive bg-destructive/5",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input id={id} {...getInputProps()} />
        {value ? (
          <div
            className="w-full space-y-3"
            onClick={(event) => event.stopPropagation()}
          >
            <AttachmentImage images={imagePreview} onRemove={handleRemove} />
            <p className="text-caption text-on-surface-variant flex items-center justify-center gap-1.5 pt-1 font-medium">
              <ImagePlus className="text-primary h-4 w-4" />
              <span> {replaceText} </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
              <CloudUpload className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-body-base text-on-surface font-semibold">
                <span className="text-primary font-bold hover:underline">
                  {uploadText}
                </span>{" "}
                {dropText}
              </p>
              <p className="text-caption text-on-surface-variant/80 font-medium">
                {placeholder}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
