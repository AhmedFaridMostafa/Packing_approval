import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedCountries from "@/components/home/FeaturedCountries";
import FeaturesShowcase from "@/components/home/FeaturesShowcase";
import DataUnavailableNotice from "@/components/home/DataUnavailableNotice";
import { api } from "@/lib/api";

const HomePage = async () => {
  const result = await api.home.getHomeData();
  const degraded = !result.success;
  const stats = result.success ? result.data.stats : undefined;
  const featuredCountries = result.success ? result.data.featuredCountries : [];

  return (
    <div className="flex flex-col">
      <HeroSection />
      {degraded ? (
        <DataUnavailableNotice />
      ) : (
        <>
          <StatsBar
            countries={stats?.countries ?? 0}
            regions={stats?.regions ?? 0}
            categories={stats?.categories ?? 0}
            guidelines={stats?.guidelines ?? 0}
          />
          <FeaturedCountries countries={featuredCountries} />
        </>
      )}
      <HowItWorks />
      <FeaturesShowcase />
    </div>
  );
};
export default HomePage;
