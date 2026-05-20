"use client";

// UI
import AuthForm from "@/components/auth/AuthForm";

// Schema
import { signupSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="Sign_up"
      getSchema={signupSchema}
      defaultValues={{ name: "", email: "", password: "" }}
    />
  );
};

export default SignUp;
