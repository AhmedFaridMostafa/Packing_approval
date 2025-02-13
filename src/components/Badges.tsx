import React from "react";

interface BadgeProps {
  text: string;
  color: "blue" | "gray" | "yellow" | "green" | "red";
}

const Badges: React.FC<BadgeProps> = ({ text, color }) => {
  const BadgesColor = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  };

  return (
    <span
      className={`me-2 rounded px-2.5 py-0.5 text-base font-medium ${BadgesColor[color]} w-fit capitalize`}
    >
      {text}
    </span>
  );
};

export default Badges;
