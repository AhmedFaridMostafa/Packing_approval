export default function LabelForm({
  id,
  labelText,
}: {
  id: string;
  labelText: string;
}) {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {labelText}
    </label>
  );
}
