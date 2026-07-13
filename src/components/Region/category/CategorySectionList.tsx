import CategorySection from "./CategorySection";

interface CategorySectionListProps {
  groupedPacking: CategoryGroup[];
  isRTL: boolean;
  isAdmin: boolean;
}

const CategorySectionList = ({
  groupedPacking,
  isRTL,
  isAdmin,
}: CategorySectionListProps) => {
  return groupedPacking.map((group) => (
    <CategorySection
      key={`${group.category.name_en}-${group.category.id}`}
      group={group}
      isRTL={isRTL}
      isAdmin={isAdmin}
    />
  ));
};

export default CategorySectionList;
