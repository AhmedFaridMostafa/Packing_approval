"use client";

import { useSlider } from "@/context/SliderContext";
export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSlider();

  return (
    <aside
      id="logo-sidebar"
      className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800`}
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
}
