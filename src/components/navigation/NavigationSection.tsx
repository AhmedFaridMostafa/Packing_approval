import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import NavigationItem from "./NavigationItem";
import { NavigationSectionProps } from "@/type/interfaces";

function NavigationSection({
  section,
  isOpen,
  onToggle,
}: NavigationSectionProps) {
  return (
    <li>
      <button
        type="button"
        className="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        onClick={onToggle}
      >
        {section.icon}
        <span className="ms-3 flex-1 whitespace-nowrap text-left rtl:text-right">
          {section.name}
        </span>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <ul className="space-y-2 py-2">
          {section.items.map((item) => (
            <NavigationItem key={item.text} item={item} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavigationSection;
