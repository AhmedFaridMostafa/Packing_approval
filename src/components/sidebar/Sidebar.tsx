// types
import { NavigationSectionData, User } from "@/type/interfaces";
// api
import { getCountries, getCurrentUser } from "@/server/data-service";
// components
import Navigation from "../navigation/Navigation";
import SidebarWrapper from "./SidebarWrapper";
// Icons
import { GiWorld } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { FaHistory, FaUsers } from "react-icons/fa";
import { FaBuildingUser, FaUserPlus } from "react-icons/fa6";
import hasPermission from "@/server/handlePermissions";
import { LuWaypoints } from "react-icons/lu";
import { TbCategoryPlus, TbWorldPlus } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { getCurrentLang } from "@/lib/getCurrentLang";
import { Lang } from "@/i18n.config";
import getTrans from "@/lib/translation";

export default async function Sidebar() {
  const countries = (await getCountries()) || [];
  const user = (await getCurrentUser()) as User | null;
  const lang = (await getCurrentLang()) as Lang;
  const { navbar } = await getTrans(lang);
  // Define navigation items with their required permissions
  const getSettingsItems = (userRole?: "admin" | "moderator" | "user") => {
    const sections: { [key: string]: NavigationSectionData } = {
      settings: {
        name: navbar["App Settings"],
        items: [],
        icon: <IoMdSettings />,
      },
      user: { name: navbar.User, items: [], icon: <FaBuildingUser /> },
    };

    if (!userRole) return {};

    sections.user.items.push({
      icon: <ImProfile />,
      link: `/${lang}/user/profile`,
      text: navbar.profile,
    });

    if (hasPermission(userRole, "create:packing_way")) {
      sections.settings.items.push({
        icon: <LuWaypoints />,
        link: `/${lang}/packing-way/add`,
        text: navbar["Add packing way"],
      });
    }

    if (hasPermission(userRole, "create:country")) {
      sections.settings.items.push({
        icon: <TbWorldPlus />,
        link: `/${lang}/country/add`,
        text: navbar["Add country"],
      });
    }

    if (hasPermission(userRole, "create:category")) {
      sections.settings.items.push({
        icon: <TbCategoryPlus />,
        link: `/${lang}/category/add`,
        text: navbar["add category"],
      });
    }

    if (hasPermission(userRole, "view:packing_history")) {
      sections.settings.items.push({
        icon: <FaHistory />,
        link: `/${lang}/country/history`,
        text: navbar.history,
      });
    }

    if (hasPermission(userRole, "create:user")) {
      sections.user.items.push({
        icon: <FaUserPlus />,
        link: `/${lang}/user/signup`,
        text: navbar["Creating user"],
      });
    }

    if (hasPermission(userRole, "view:usersList")) {
      sections.user.items.push({
        icon: <FaUsers />,
        link: `/${lang}/user/list`,
        text: navbar["All users"],
      });
    }

    // Filter out sections with no items
    return Object.fromEntries(
      Object.entries(sections).filter(
        ([, section]) => section.items.length > 0,
      ),
    );
  };

  const settings = getSettingsItems(user?.role);
  const settingsSections = Object.values(settings);
  // Base navigation sections
  const navigationData: NavigationSectionData[] = [
    {
      name: navbar.Countries,
      items: countries.map((country) => ({
        icon: country.flag_url.trim(),
        link: `/${lang}/country/${
          country.account +
          "-" +
          country.country_name.en.replaceAll(" ", "_") +
          "-" +
          country.id
        }`,
        text: `${country.country_name[lang]} (${country.account})`,
      })),
      icon: <GiWorld />,
    },
    ...(user ? settingsSections : []),
  ];

  return (
    <SidebarWrapper>
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <Navigation data={navigationData} />
      </div>
    </SidebarWrapper>
  );
}
