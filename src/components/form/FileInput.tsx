import { FileInputProps } from "@/type/interfaces";
import LabelForm from "./LabelForm";
import ErrorForm from "./ErrorForm";

const FileInput = ({
  id,
  label,
  name,
  placeholder,
  required,
  disabled,
  error,
  accept,
}: FileInputProps) => (
  <div className="space-y-2">
    {label && id && <LabelForm labelText={label} id={id} />}
    <input
      id={id}
      type="file"
      name={name || id}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      accept={accept}
      className={`focus:ring-primary-600 focus:border-primary-600 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-gray-900 file:mr-4 file:cursor-pointer file:border-none file:bg-gray-800 file:px-4 file:py-2 file:text-white disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:file:bg-gray-700 disabled:dark:bg-gray-700 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <ErrorForm error={error} />}
  </div>
);

export default FileInput;
