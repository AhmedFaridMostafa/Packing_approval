"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImageIcon, X } from "lucide-react";

import type { z } from "zod";

import { ACCEPTED_IMAGE_TYPES } from "@/constants";
import { profileSchema } from "@/lib/validations";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "@/i18n/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn, getInitials } from "@/lib/utils";
import useObjectUrl from "@/hooks/useObjectUrl";

type ProfileFormValues = z.infer<ReturnType<typeof profileSchema>>;

const ProfileInformationForm = ({ user }: { user: ProfileSource }) => {
  const validationT = useTranslations("validation");
  const t = useTranslations("account.profileInformation");
  const toastT = useTranslations("account.toasts");
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema(validationT)),

    mode: "onChange",
    defaultValues: { name: user.name },
  });

  const { isSubmitting, isDirty } = form.formState;

  const avatarFile = useWatch({ control: form.control, name: "avatar" });
  const preview = useObjectUrl(avatarFile);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await apiClient.profile.updateProfile({
        name: data.name,
        ...(data.avatar ? { image: data.avatar } : {}),
      });

      if (!response.success) {
        toast.error(response.error?.message || toastT("profileUpdateFailed"));
        return;
      }

      toast.success(toastT("profileUpdated"));
      // Clears the pending avatar and re-baselines dirty state to the saved name.
      form.reset({ name: data.name });
      router.refresh();
    } catch {
      toast.error(toastT("profileUpdateFailed"));
    }
  };

  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8">
      <h3 className="font-heading text-on-surface mb-6 text-lg font-bold">
        {t("title")}
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="space-y-5">
          {/* Profile picture */}
          <Controller
            name="avatar"
            control={form.control}
            render={({ field: { onChange }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center gap-4">
                  <Avatar className="border-border h-20 w-20 border-2">
                    <AvatarImage
                      src={preview ?? user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2">
                    <input
                      id="avatar-input"
                      type="file"
                      className="peer sr-only"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      aria-invalid={fieldState.invalid}
                      onChange={(event) => onChange(event.target.files?.[0])}
                    />
                    <FieldLabel
                      htmlFor="avatar-input"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "border-border h-11 cursor-pointer rounded-xl font-semibold",
                        "peer-focus-visible:ring-primary peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                      )}
                    >
                      <ImageIcon className="h-4 w-4" />
                      {t("profilePicture")}
                    </FieldLabel>
                    {avatarFile && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={t("removePhoto")}
                        className="text-on-surface-variant h-11 w-11 rounded-xl"
                        onClick={() => onChange(undefined)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Full name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-on-surface font-semibold"
                >
                  {t("fullName")}
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-surface-container-low border-border h-11 rounded-xl font-medium"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-brand-hover h-12 w-full rounded-xl font-semibold shadow-sm transition-all duration-200"
        >
          {isSubmitting ? <Spinner className="h-5 w-5" /> : t("updateButton")}
        </Button>
      </form>
    </Card>
  );
};

export default ProfileInformationForm;
