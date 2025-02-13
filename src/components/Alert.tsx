import { FaInfoCircle } from "react-icons/fa";

type Variant = "info" | "danger" | "success" | "warning" | "dark";

interface VariantStyles {
  containerClass: string;
}

interface VariantMap {
  [key: string]: VariantStyles;
}

interface AlertProps {
  variant?: Variant;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant = "info", children }) => {
  const variants: VariantMap = {
    info: {
      containerClass:
        "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    },
    danger: {
      containerClass:
        "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",
    },
    success: {
      containerClass:
        "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400",
    },
    warning: {
      containerClass:
        "p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
    },
    dark: {
      containerClass:
        "p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
    },
  };

  const { containerClass } = variants[variant];

  return (
    <div className={containerClass} role="alert">
      <FaInfoCircle className="me-3 inline h-4 w-4" /> {children}
    </div>
  );
};

export default Alert;
