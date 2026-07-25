import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageButton } from "@/components/layout/header/LanguageButton";
import { ModeToggle } from "@/components/layout/header/ModeToggle";
import { Separator } from "@/components/ui/separator";
import DropdownMenuAvatar from "@/components/layout/header/DropdownMenuAvatar";

interface AdminHeaderProps {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  return (
    <header className="bg-surface-container-lowest border-b-border sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-heading text-on-surface text-lg font-bold">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <LanguageButton />
        <ModeToggle />
        <DropdownMenuAvatar />
      </div>
    </header>
  );
};

export default AdminHeader;
