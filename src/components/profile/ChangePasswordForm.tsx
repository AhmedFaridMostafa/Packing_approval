import { updatePassword } from "@/server/actions";
import Form from "../form/Form";
import SpinnerMini from "../SpinnerMini";
import Box from "../Box";
interface ChangePassword {
  changePassword: {
    title: string;
    currentPassword: {
      label: string;
      placeholder: string;
    };
    newPassword: {
      label: string;
      placeholder: string;
    };
    confirmNewPassword: {
      label: string;
      placeholder: string;
    };
    updateButton: string;
  };
}

export default function ChangePasswordForm({ changePassword }: ChangePassword) {
  const formFields = [
    {
      id: "currentPassword",
      label: changePassword.currentPassword.label,
      type: "password",
      placeholder: changePassword.currentPassword.placeholder,
      required: true,
    },
    {
      id: "newPassword",
      label: changePassword.newPassword.label,
      type: "password",
      placeholder: changePassword.newPassword.placeholder,
      required: true,
      minLength: 8,
    },
    {
      id: "confirmPassword",
      label: changePassword.confirmNewPassword.label,
      type: "password",
      placeholder: changePassword.confirmNewPassword.placeholder,
      required: true,
      minLength: 8,
    },
  ];

  const buttonData = {
    value: changePassword.updateButton,
    className: "w-full",
    loading: <SpinnerMini />,
  };
  return (
    <Box>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {changePassword.title}
      </h2>
      <Form
        formAction={updatePassword}
        formFields={formFields}
        buttonData={buttonData}
      />
    </Box>
  );
}
