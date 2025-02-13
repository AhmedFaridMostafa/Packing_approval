import { ThemeSelect } from "./ThemeSelect";
import Box from "../Box";
import LanguageSwitcher from "./LanguageSwitcher";
interface AppPreferencesProps {
  appSetting: {
    title: string;
    theme: {
      title: string;
      light: string;
      dark: string;
    };
  };
}
export default function AppPreferences({ appSetting }: AppPreferencesProps) {
  return (
    <Box>
      <h3 className="text-2xl font-bold">{appSetting.title}</h3>
      <LanguageSwitcher variant="select" />
      <ThemeSelect themeLang={appSetting.theme} />
    </Box>
  );
}
