import { TextareaFieldProps } from "@/type/interfaces";
import LabelForm from "./LabelForm";
import ErrorForm from "./ErrorForm";

const TextareaField = ({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  required,
  disabled,
  error,
  rows = 4,
}: TextareaFieldProps) => (
  <div className="space-y-2">
    {label && <LabelForm labelText={label} id={name || id} />}
    <textarea
      id={id}
      name={name || id}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      rows={rows}
      className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 disabled:dark:bg-gray-700 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <ErrorForm error={error} />}
  </div>
);

export default TextareaField;
