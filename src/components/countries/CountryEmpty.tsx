import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface ContainerEmptyProps {
  title: string;
  description: string;
  clearText: string;
}

const ContainerEmpty = ({
  title,
  description,
  clearText,
}: ContainerEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-accent text-primary relative mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <Globe className="relative z-10 h-10 w-10" />
      </div>
      <h2 className="font-heading text-section-title text-on-surface mb-2 font-bold">
        {title}
      </h2>
      <p className="text-body-base text-on-surface-variant mb-6 max-w-sm leading-relaxed">
        {description}
      </p>
      <Button variant="outline" asChild>
        <Link href={ROUTES.COUNTRIES}>{clearText}</Link>
      </Button>
    </div>
  );
};

export default ContainerEmpty;
