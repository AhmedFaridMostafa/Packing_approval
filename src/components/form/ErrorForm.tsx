export default function ErrorForm({ error }: { error: string }) {
  return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
}
