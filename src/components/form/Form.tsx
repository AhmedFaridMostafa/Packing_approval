"use client";

import { useActionState } from "react";
import Button from "../Button";
import Alert from "../Alert";
import FormField from "./FormField";
import { FormProps } from "@/type/interfaces";

export default function Form({
  formAction,
  formFields,
  buttonData,
}: FormProps) {
  type ErrorsType = {
    [key: string]: string[];
  };

  const [state, action, isPending] = useActionState(formAction, {
    success: false,
    message: "",
    errors: formFields.reduce<ErrorsType>(
      (acc, field) => ({ ...acc, [String(field.id || field.name)]: [] }),
      {},
    ),
  });

  return (
    <form className="space-y-4 md:space-y-6" action={action}>
      {formFields.map((field, index) => (
        <FormField
          key={`${index}_${field.id}`}
          {...field}
          disabled={isPending || field.disabled}
          error={state?.errors[String(field.id || field.name)]?.[0]}
          className={field?.className}
        />
      ))}

      {state?.message && (
        <Alert variant={state.success ? "success" : "danger"}>
          {state.message}
        </Alert>
      )}

      <Button
        type="submit"
        status={isPending}
        theme="default"
        className={buttonData.className}
      >
        {isPending ? buttonData.loading : buttonData.value}
      </Button>
    </form>
  );
}
