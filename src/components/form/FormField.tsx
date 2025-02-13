import TextInput from "./TextInput";
import FileInput from "./FileInput";
import PasswordInput from "./PasswordInput";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import { FormFieldComponentProps, SelectOption } from "@/type/interfaces";
import { SingleValue } from "react-select";

const FormField = (props: FormFieldComponentProps) => {
  const { type } = props;

  switch (type) {
    case "select":
      return (
        <SelectField
          {...props}
          options={props.options || []}
          value={props.value as SingleValue<SelectOption> | undefined}
        />
      );
    case "textarea":
      return <TextareaField {...props} rows={props.rows} />;
    case "file":
      return <FileInput {...props} accept={props.accept} />;
    case "password":
      return <PasswordInput {...props} type="password" />;
    default:
      return (
        <TextInput
          {...props}
          value={(props.value as number | string) ?? undefined}
          type={type as "text" | "email" | "number" | "tel" | "hidden"}
        />
      );
  }
};

export default FormField;
