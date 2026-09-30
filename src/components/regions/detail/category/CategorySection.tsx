import PackingCard from "../packing/PackingCard";

interface CategorySectionProps {
  group: CategoryGroup;
  isRTL: boolean;
  isAdmin: boolean;
}

const CategorySection = ({ group, isRTL, isAdmin }: CategorySectionProps) => {
  const cat = group.category;
  const catName = isRTL ? cat.name_ar : cat.name_en;

  return (
    <section
      id={`category-${cat.id}`}
      data-category-id={cat.id}
      className="mb-14 scroll-mt-36"
    >
      <h2 className="font-heading text-on-surface border-border mb-6 flex items-center gap-2 border-b pb-3 text-xl font-bold capitalize sm:text-2xl">
        <span className="bg-primary h-5 w-1.5 rounded-full" />
        {catName}
        <span className="text-caption bg-accent text-primary rounded-full px-2.5 py-0.5 font-semibold tabular-nums">
          {group.items.length}
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => (
          <PackingCard
            key={item.id}
            {...item}
            isAdmin={isAdmin}
            isRTL={isRTL}
          />
        ))}
      </div>
    </section>
  );
};
export default CategorySection;
