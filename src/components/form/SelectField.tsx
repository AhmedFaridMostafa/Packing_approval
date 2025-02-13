import { SelectFieldProps, SelectOption } from "@/type/interfaces";
import Select from "react-select";
import type { ClassNamesConfig } from "react-select";
import ErrorForm from "./ErrorForm";
import LabelForm from "./LabelForm";
import { useId } from "react";

const SelectField = ({
  name,
  label,
  options,
  defaultValue,
  value,
  placeholder = "Select...",
  required,
  disabled,
  error,
  onChange,
  isClearable = false,
  isLoading,
}: SelectFieldProps) => {
  const id = useId();
  const selectClasses: ClassNamesConfig<SelectOption, false> = {
    control: ({ isFocused }) =>
      `!bg-white dark:!bg-gray-800 !border-gray-300 dark:!border-gray-600 !rounded-md !shadow-sm p-2 ${
        isFocused
          ? "!border-blue-500 dark:!border-blue-400 !ring-1 !ring-blue-500"
          : "hover:!border-gray-400"
      }`,
    menu: () =>
      "!bg-white dark:!bg-gray-800 !border !border-gray-200 dark:!border-gray-700 !rounded-md !shadow-lg !mt-1",
    option: ({ isFocused, isSelected }) =>
      `!px-4 !py-2 ${
        isSelected
          ? "!bg-blue-500 !text-white"
          : isFocused
            ? "!bg-blue-50 dark:!bg-gray-700"
            : ""
      }`,
    singleValue: () => "!text-gray-900 dark:!text-white",
  };

  return (
    <div className="space-y-2">
      {label && <LabelForm labelText={label} id={id} />}
      <Select
        instanceId={id}
        inputId={id}
        name={name}
        defaultValue={
          options?.find(
            (option) => option.value === defaultValue,
          ) as SelectOption
        }
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={disabled}
        required={required}
        classNames={selectClasses}
        isClearable={isClearable}
        unstyled
        isLoading={isLoading}
      />
      {error && <ErrorForm error={error} />}
    </div>
  );
};

export default SelectField;
