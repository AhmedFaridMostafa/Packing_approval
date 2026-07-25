import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SidebarHeader } from "@/components/ui/sidebar";

interface SidebarBrandProps {
  title: string;
}

const SidebarBrand = async ({ title }: SidebarBrandProps) => {
  return (
    <SidebarHeader className="border-b-border border-b p-4">
      <Link href="/admin" className="flex items-center gap-3">
        <Image
          alt="Packing Approval logo"
          src="/site-logo.png"
          width={32}
          height={32}
        />

        <div className="flex flex-col">
          <span className="font-heading text-primary text-base font-bold">
            {title}
          </span>

          <span className="text-caption text-on-surface-variant flex items-center gap-1 font-medium">
            <ShieldAlert className="h-3 w-3 text-emerald-500" />
           {title}
          </span>
        </div>
      </Link>
    </SidebarHeader>
  );
};

export default SidebarBrand;
