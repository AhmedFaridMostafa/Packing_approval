import { TextInputProps } from "@/type/interfaces";
import LabelForm from "./LabelForm";
import ErrorForm from "./ErrorForm";

const TextInput = ({
  id,
  type,
  name,
  label,
  defaultValue,
  className,
  placeholder,
  required,
  disabled,
  error,
  value,
}: TextInputProps) => (
  <div className={`space-y-2 ${className}`}>
    {label && id && <LabelForm labelText={label} id={id} />}
    <input
      id={id}
      name={name || id}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      value={value}
      className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 disabled:dark:bg-gray-700 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <ErrorForm error={error} />}
  </div>
);

export default TextInput;
