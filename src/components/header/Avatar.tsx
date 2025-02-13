import React from "react";
import CloudImage from "../CloudImage";
import { User } from "@/type/interfaces";

export default function Avatar({ user }: { user: User }) {
  return (
    <>
      {user && user.avatar_url ? (
        <CloudImage
          width={40}
          height={40}
          src={user?.avatar_url}
          alt={`avatar of ${user?.full_name}`}
          className="block h-10 w-10 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
        />
      ) : (
        <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {user && user.full_name && user.full_name[0]}
          </span>
        </div>
      )}
      <span className="text-nowrap text-base font-medium capitalize text-gray-600 dark:text-gray-300">
        {user && user.full_name && user.full_name}
      </span>
    </>
  );
}
