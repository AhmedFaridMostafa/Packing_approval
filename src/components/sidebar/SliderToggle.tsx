"use client";
import { useSlider } from "@/context/SliderContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

export function SliderToggle() {
  const { isOpen, toggleSlider } = useSlider();
  return (
    <button
      onClick={toggleSlider}
      type="button"
      className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Toggle sidebar</span>
      {isOpen ? (
        <AiOutlineClose className="h-6 w-6" aria-hidden="false" />
      ) : (
        <FaBars className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
