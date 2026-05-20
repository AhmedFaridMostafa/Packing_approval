"use client";

// UI
import AuthForm from "@/components/auth/AuthForm";

// Schema
import { signinSchema } from "@/lib/validations";

const SignInPage = () => {
  return (
    <AuthForm
      formType="Sign_in"
      getSchema={signinSchema}
      defaultValues={{ email: "", password: "" }}
    />
  );
};

export default SignInPage;
