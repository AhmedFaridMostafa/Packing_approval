import Image from "next/image";
import Link from "next/link";
import { IoCaretBack } from "react-icons/io5";
import notFound from "../../../public/404.svg";
function NotFound() {
  return (
    <section className="mx-auto flex h-full flex-col items-center justify-center space-y-2 px-6">
      <div className="relative max-w-80">
        <Image src={notFound} alt="Not_Found" className="h-auto w-full" />
      </div>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          404 Not Found
        </h1>
        <p className="text-3xl font-semibold">
          Whoops! That page doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium capitalize text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoCaretBack /> Go back home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
