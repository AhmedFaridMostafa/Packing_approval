import { api } from "@/lib/api";
import HistoryFilterControls from "./HistoryFilterControls";

interface HistoryFilterBarProps {
  requestHeaders: Headers;
  searchPlaceholder: string;
  allActions: string;
  allCountries: string;
  allRegions: string;
  allCategories: string;
  actionLabels: { create: string; update: string; delete: string };
}

const HistoryFilterBar = async ({
  requestHeaders,
  ...labels
}: HistoryFilterBarProps) => {
  const result = await api.packingWays.getFormData(requestHeaders);
  const formData = result.success ? result.data : null;

  return (
    <HistoryFilterControls
      countries={formData?.countries ?? []}
      regionsByCountry={formData?.regionsByCountry ?? {}}
      categories={formData?.categories ?? []}
      {...labels}
    />
  );
};

export default HistoryFilterBar;
