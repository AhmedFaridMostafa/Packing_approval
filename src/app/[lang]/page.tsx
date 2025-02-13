import { getCurrentLang } from "@/lib/getCurrentLang";
import getTrans from "@/lib/translation";

export default async function Home() {
  const lang = await getCurrentLang();
  const { home } = await getTrans(lang);
  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold text-blue-600 dark:text-blue-400">
        {home.title}
      </h1>
      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {home.introduction}
      </p>

      <h2 className="mb-3 text-2xl font-semibold text-blue-500 dark:text-blue-300">
        {home.why_packing_matters.title}
      </h2>

      <ul className="mb-6 list-inside list-disc space-y-2 ps-2 text-gray-700 dark:text-gray-300">
        {home.why_packing_matters.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <h2 className="mb-3 text-2xl font-semibold text-blue-500 dark:text-blue-300">
        {home.how_this_helps.title}
      </h2>

      <ul className="mb-6 list-inside list-disc space-y-2 ps-2 text-gray-700 dark:text-gray-300">
        {home.how_this_helps.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {home.conclusion}
      </p>
    </>
  );
}
