import { NavigationItemProps } from "@/type/interfaces";
import Image from "next/image";
import Link from "next/link";
import CloudImage from "../CloudImage";

function NavigationItem({ item }: NavigationItemProps) {
  return (
    <li>
      <Link
        href={item.link}
        className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {typeof item.icon !== "string" ? (
          item.icon
        ) : item.icon.startsWith("http://") ||
          item.icon.startsWith("https://") ? (
          <Image
            width={20}
            height={20}
            src={item.icon}
            alt={item.text}
            className="h-5 w-auto"
          />
        ) : (
          <CloudImage
            width={20}
            height={20}
            src={item.icon}
            alt={item.text}
            className="h-5 w-auto"
          />
        )}
        <span className="ms-3">{item.text}</span>
      </Link>
    </li>
  );
}

export default NavigationItem;
