// Auth
export interface User {
  id?: string;
  full_name: string;
  avatar_url: string;
  email: string;
  role: "admin" | "moderator" | "user";
}
// Theme
export type Theme = "dark" | "light";

// Slider
export interface SliderContextType {
  isOpen: boolean;
  toggleSlider: () => void;
}
// Language
export interface Lang {
  ar: string;
  en: string;
}

// Country
export interface Country {
  id: number;
  account: string;
  flag_url: string;
  label_name: string;
  country_name: Lang;
  labels: string;
}

export interface PackingHistory {
  id: number;
  country_id: number;
  change_timestamp: Date;
  changed_by: string;
  action: "delete" | "add" | "edit";
  change_title: Lang;
  change_description: Lang;
  country?: Country;
  categories?: Categories;
}
// Card
export interface CardInfo {
  title: string;
  description: string;
  image: string;
  children?: React.ReactNode;
}

// Categories
export interface Categories {
  id: number;
  name: Lang;
}

// Packing
export interface Packing {
  id: number;
  category_id: number;
  region_id: number;
  title: Lang;
  categories: Categories;
  country: Country;
  description: Lang;
  image_url: string;
}

export interface GroupedPacking {
  [key: string]: Packing[];
}

// Navigation

export interface NavigationItem {
  icon: string | React.ReactNode;
  link: string;
  text: string;
}

export interface NavigationSectionData {
  name: string;
  items: NavigationItem[];
  icon: React.ReactNode;
}

export interface NavigationSectionProps {
  section: NavigationSectionData;
  isOpen: boolean;
  onToggle: () => void;
}

export interface NavigationProps {
  data: NavigationSectionData[];
}

export interface NavigationItemProps {
  item: NavigationItem;
}
// Form

// types/interfaces.ts
import type { SingleValue, ClassNamesConfig } from "react-select";

// Base option type
export interface SelectOption {
  value: string;
  label: string | number | React.ReactNode;
}

// Base form field props
interface BaseFormFieldProps {
  id?: string;
  name?: string; // Added required name prop
  label?: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

// Text Input
export interface TextInputProps extends BaseFormFieldProps {
  type: "text" | "email" | "number" | "tel" | "hidden";
  value?: string | number;
}

// Password Input
export interface PasswordInputProps extends BaseFormFieldProps {
  type: "password";
}

// File Input
export interface FileInputProps extends BaseFormFieldProps {
  accept?: string;
}

// Textarea Field
export interface TextareaFieldProps extends BaseFormFieldProps {
  rows?: number;
}

// Select Field
export interface SelectFieldProps extends Omit<BaseFormFieldProps, "id"> {
  options: SelectOption[];
  value?: SingleValue<SelectOption>;
  onChange?: (value: SingleValue<SelectOption>) => void;
  isClearable?: boolean;
  isLoading?: boolean;
}

// Form Component
export interface FormProps {
  formAction: (
    prevState: FormInitialState,
    formData: FormData,
  ) => Promise<FormInitialState>;
  formFields: FormFieldComponentProps[];
  buttonData: ButtonData;
}

// Form Field Component
export interface FormFieldComponentProps extends BaseFormFieldProps {
  type?: string;
  value?: string | number | SelectOption | null;
  options?: SelectOption[];
  rows?: number;
  accept?: string;
  onChange?: (value: string | SelectOption | null) => void;
}

// Form State
export interface FormInitialState {
  success: boolean;
  message: string;
  errors: {
    [key: string]: string[];
  };
}

// Button Configuration
export interface ButtonData {
  value: string;
  className: string;
  loading: React.ReactNode;
}

// React-Select Class Names Config
export type SelectClassNames = ClassNamesConfig<SelectOption, false>;
