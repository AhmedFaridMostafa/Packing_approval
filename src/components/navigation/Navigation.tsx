"use client";

import { useState } from "react";
import NavigationSection from "./NavigationSection";
import { NavigationProps } from "@/type/interfaces";

function Navigation({ data }: NavigationProps) {
  const [openSection, setOpenSection] = useState<string>("");

  return (
    <ul className="space-y-4 py-2 font-medium">
      {data.map((section) => (
        <NavigationSection
          key={section.name}
          section={section}
          isOpen={openSection === section.name}
          onToggle={() =>
            setOpenSection(openSection === section.name ? "" : section.name)
          }
        />
      ))}
    </ul>
  );
}

export default Navigation;
