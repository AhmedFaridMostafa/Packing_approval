import { NavigationItemProps } from "@/type/interfaces";
import Image from "next/image";
import Link from "@/components/link";
import CloudImage from "../CloudImage";
import { useSlider } from "@/context/SliderContext";

function NavigationItem({ item }: NavigationItemProps) {
  const { toggleSlider } = useSlider();
  return (
    <li>
      <Link
        onClick={() => {
          toggleSlider();
        }}
        href={item.link}
        className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <div className="relative h-7 w-8">
          {typeof item.icon !== "string" ? (
            item.icon
          ) : item.icon.startsWith("http://") ||
            item.icon.startsWith("https://") ? (
            <Image
              className="h-5 w-auto object-contain"
              src={item.icon}
              alt={item.text}
              fill
            />
          ) : (
            <CloudImage
              width={30}
              height={20}
              src={item.icon}
              alt={item.text}
              className="h-5 w-auto object-contain"
            />
          )}
        </div>
        <span className="ms-3">{item.text}</span>
      </Link>
    </li>
  );
}

export default NavigationItem;
