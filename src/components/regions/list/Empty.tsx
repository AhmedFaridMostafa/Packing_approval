interface RegionsEmptyProps {
  IconTitle: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const RegionsEmpty = ({ IconTitle, title, description }: RegionsEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-accent text-primary relative mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <IconTitle className="relative z-10 h-10 w-10" />
      </div>
      <h2 className="font-heading text-section-title text-on-surface mb-2 font-bold">
        {title}
      </h2>
      <p className="text-body-base text-on-surface-variant mb-6 max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default RegionsEmpty;
