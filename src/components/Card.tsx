// Card.tsx
import { CardInfo } from "@/type/interfaces";
import Box from "./Box";
import CloudImage from "./CloudImage";

const Card = ({
  title,
  description,
  image,
  updated_at,
  children,
}: CardInfo) => {
  return (
    <Box className="relative !px-0 !pt-0">
      {/* Menu container */}
      {children && (
        <div className="absolute right-2 top-2 z-10">{children}</div>
      )}
      <CloudImage
        className="!mt-0 rounded-t-lg"
        src={image}
        alt={title}
        width={400}
        height={300}
        version={
          updated_at ? new Date(updated_at).getTime().toString() : undefined
        }
        loading="eager"
      />
      <div className="px-4 py-2">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <hr className="mb-2 border-gray-300 dark:border-gray-700" />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Box>
  );
};

export default Card;
