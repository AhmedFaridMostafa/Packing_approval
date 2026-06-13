import { ROUTES } from "@/constants/routes";
import { fetchHandler } from "./fetch-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  home: {
    getHomeData: (t?: TranslateFn) =>
      fetchHandler<getHomeDataResponse>(
        `${API_BASE_URL}/${ROUTES.HOME_API}`,
        {},
        t,
      ),
  },
};
