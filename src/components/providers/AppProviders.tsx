import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
export default AppProviders;
