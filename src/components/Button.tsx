"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
  theme?: "default" | "light" | "green" | "red";
}

const SIZES = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const THEMES = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  light:
    "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  green:
    "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
};

function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  size = "sm",
  theme = "default",
}: ButtonProps) {
  const baseClass =
    "rounded-lg text-center font-medium focus:outline-none capitalize";
  const sizeClass = SIZES[size] || SIZES.sm;
  const themeClass = THEMES[theme] || THEMES.default;
  return (
    <button
      type={type}
      className={`${baseClass} ${sizeClass} ${themeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
