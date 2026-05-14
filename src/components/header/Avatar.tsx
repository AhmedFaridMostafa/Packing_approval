import CloudImage from "../CloudImage";
import Image from "next/image";
import { User } from "better-auth";

export default function Avatar({ user }: { user: User }) {
  const isExternalUrl =
    user?.image?.startsWith("http://") || user?.image?.startsWith("https://");

  return (
    <>
      {user && user.image ? (
        isExternalUrl ? (
          <Image
            width={40}
            height={40}
            src={user.image}
            alt={`avatar of ${user?.name}`}
            className="block h-10 w-10 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
          />
        ) : (
          <CloudImage
            width={40}
            height={40}
            src={user.image}
            alt={`avatar of ${user?.name}`}
            className="block h-10 w-10 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
          />
        )
      ) : (
        <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {user && user.name && user.name[0]}
          </span>
        </div>
      )}
      <span className="text-base font-medium text-nowrap text-gray-600 capitalize dark:text-gray-300">
        {user && user.name && user.name}
      </span>
    </>
  );
}

