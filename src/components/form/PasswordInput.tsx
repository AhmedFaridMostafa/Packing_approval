"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordInputProps } from "@/type/interfaces";
import LabelForm from "./LabelForm";
import ErrorForm from "./ErrorForm";

const PasswordInput = ({
  id,
  label,
  name,
  placeholder,
  required,
  disabled,
  error,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <LabelForm labelText={label} id={id || name || ""} />}
      <div className="relative">
        <input
          id={id}
          name={name || id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 pr-10 text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 disabled:dark:bg-gray-700 ${
            error ? "border-red-500" : ""
          }`}
          autoComplete="bday-year webauthn"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="h-5 w-5" />
          ) : (
            <FaEye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <ErrorForm error={error} />}
    </div>
  );
};

export default PasswordInput;
