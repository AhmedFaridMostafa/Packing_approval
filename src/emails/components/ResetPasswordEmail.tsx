import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

import { User } from "better-auth";
import { createTranslator } from "next-intl";

import type { Locale } from "@/i18n/routing";

import arMessages from "../messages/ArEmail.json";
import enMessages from "../messages/EnEmail.json";

interface ResetPasswordEmailProps {
  user: User;
  url: string;
  locale: Locale;
}

const ResetPasswordEmail = ({ user, url, locale }: ResetPasswordEmailProps) => {
  const messages = createTranslator({
    locale,
    messages: locale === "en" ? enMessages : arMessages,
    namespace: "ResetPasswordEmail",
  });

  const previewText = messages("previewText");

  return (
    <Tailwind>
      <Html dir={locale === "ar" ? "rtl" : "ltr"}>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="mx-auto my-auto bg-zinc-50 px-4 py-8 font-sans">
          <Container className="mx-auto my-10 max-w-125 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
            <Section className="mb-6 text-center">
              <Text className="m-0 text-2xl font-bold tracking-tight text-zinc-950">
                📦 {messages("project_title")}
              </Text>
            </Section>

            <Heading className="m-0 mb-6 text-center text-xl font-semibold tracking-tight text-zinc-950">
              {messages("title")}
            </Heading>

            <Text className="mb-4 text-base leading-relaxed text-zinc-700">
              {user?.name
                ? messages("greeting", { name: user.name })
                : messages("greetingFallback")}
            </Text>

            <Text className="mb-6 text-base leading-relaxed text-zinc-700">
              {messages.rich("message", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </Text>

            <Section className="my-8 text-center">
              <Button
                className="rounded-md bg-zinc-950 px-6 py-3 text-sm font-medium text-white no-underline shadow-sm transition-colors hover:bg-zinc-800"
                href={url}
              >
                {messages("buttonText")}
              </Button>
            </Section>

            <Text className="mb-4 text-base leading-relaxed text-zinc-700">
              {messages("fallbackText")}{" "}
              <Link
                href={url}
                className="break-all text-blue-600 underline"
                dir="ltr"
              >
                {url}
              </Link>
            </Text>

            <Hr className="my-8 border-zinc-200" />

            <Text className="mb-2 text-center text-sm leading-relaxed text-zinc-500">
              {messages("ignoreText")}
            </Text>

            <Text className="m-0 text-center text-xs text-zinc-400">
              {messages("copyright", {
                year: new Date().getFullYear().toString(),
              })}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ResetPasswordEmail.PreviewProps = {
  user: {
    id: "1",
    name: "Ahmed Fared",
    email: "ahmed.super997@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerified: false,
  },
  url: "https://example.com/reset-password?token=abcdef1234567890",
  locale: "en",
};
export default ResetPasswordEmail;

export const ResetPasswordEmailSubject = {
  en: "Reset your password for Packing Approval",
  ar: "إعادة تعيين كلمة المرور لحسابك في موافقة التعبئة",
};
