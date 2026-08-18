import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedCountries } from "@/components/home/FeaturedCountries";
import { FeaturesShowcase } from "@/components/home/FeaturesShowcase";
import { api } from "@/lib/api";
import ErrorState from "@/components/shared/ErrorState";

export default async function Home() {
  const result = await api.home.getHomeData();

  if (!result.success)
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );

  const { stats, featuredCountries } = result.data;
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar
        countries={stats?.countries ?? 0}
        regions={stats?.regions ?? 0}
        categories={stats?.categories ?? 0}
        guidelines={stats?.guidelines ?? 0}
      />
      <HowItWorks />
      <FeaturedCountries countries={featuredCountries} />
      <FeaturesShowcase />
    </div>
  );
}
