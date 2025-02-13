"use client";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { SelectOption } from "@/type/interfaces";
import SelectField from "../form/SelectField";

export function ThemeSelect({
  themeLang,
}: {
  themeLang: {
    title: string;
    light: string;
    dark: string;
  };
}) {
  const themeOptions: SelectOption[] = useMemo(
    () => [
      { value: "light", label: themeLang.light },
      { value: "dark", label: themeLang.dark },
    ],
    [themeLang],
  );
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<SelectOption | null>(null);

  useEffect(() => {
    const currentTheme = themeOptions.find((option) => option.value === theme);
    setSelectedTheme(currentTheme ?? themeOptions[0]);
  }, [theme, themeLang, themeOptions]);

  return (
    <SelectField
      name="theme"
      label={themeLang.title}
      options={themeOptions}
      value={selectedTheme}
      onChange={(option) => {
        if (option) {
          setTheme(option.value);
          setSelectedTheme(option);
        }
      }}
      isClearable={false}
    />
  );
}
