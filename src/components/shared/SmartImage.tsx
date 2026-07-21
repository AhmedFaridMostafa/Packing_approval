import Image, { type ImageProps } from "next/image";
import { isCloudinaryUrl } from "@/lib/utils";
import CldImage from "@/components/shared/CldImage";

type SmartImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

const SmartImage = ({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: SmartImageProps) => {
  if (isCloudinaryUrl(src)) {
    return (
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};

export default SmartImage;
