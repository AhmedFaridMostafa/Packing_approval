import { updateProfile } from "@/server/actions";
import Form from "../form/Form";
import SpinnerMini from "../SpinnerMini";
import { User } from "@/type/interfaces";
import Box from "../Box";

interface ProfileFormProps {
  user: User;
  profileInformation: {
    title: string;
    fullName: string;
    profilePicture: string;
    updateButton: string;
  };
}

export default function ProfileForm({
  user,
  profileInformation,
}: ProfileFormProps) {
  const formFields = [
    {
      id: "name",
      label: profileInformation.fullName,
      type: "text",
      required: true,
      defaultValue: user.full_name,
    },
    {
      id: "avatar",
      label: profileInformation.profilePicture,
      type: "file",
      accept: "image/*",
      required: false,
    },
  ];

  const buttonData = {
    value: profileInformation.updateButton,
    className: "w-full",
    loading: <SpinnerMini />,
  };

  return (
    <Box>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {profileInformation.title}
      </h2>
      <Form
        formAction={updateProfile}
        formFields={formFields}
        buttonData={buttonData}
      />
    </Box>
  );
}
