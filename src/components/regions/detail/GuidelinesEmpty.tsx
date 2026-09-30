import { PackageOpen } from "lucide-react";

interface GuidelinesEmptyProps {
  title: string;
  description: string;
}
const GuidelinesEmpty = ({ title, description }: GuidelinesEmptyProps) => {
  return (
    <section className="section-container flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="bg-accent flex h-20 w-20 items-center justify-center rounded-full">
          <PackageOpen className="text-primary/50 h-10 w-10" />
        </div>
      </div>
      <h2 className="font-heading text-on-surface mb-2 text-xl font-bold">
        {title}
      </h2>
      <p className="text-on-surface-variant max-w-md">{description}</p>
    </section>
  );
};

export default GuidelinesEmpty;
