import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface RegionNavProps {
  homeNav: string;
  countriesNav: string;
  countrySlug: string;
  countryName: string;
  regionName: string;
}

const RegionNav = ({
  countriesNav,
  countryName,
  homeNav,
  countrySlug,
  regionName,
}: RegionNavProps) => {
  return (
    <Breadcrumb className="mb-8 font-medium">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.HOME}>{homeNav}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.COUNTRIES}>{countriesNav}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.COUNTRY(countrySlug)}>{countryName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">
            {regionName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RegionNav;
