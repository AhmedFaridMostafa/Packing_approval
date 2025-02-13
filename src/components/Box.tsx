export default function Box({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${className} w-full max-w-sm space-y-3 rounded-lg border border-gray-200 bg-white p-4 pb-10 shadow dark:border-gray-700 dark:bg-gray-800`}
    >
      {children}
    </div>
  );
}
