import Header from "@/components/header/Header";
// import Sidebar from "@/components/sidebar/Sidebar";
// import { SliderProvider } from "@/context/SliderContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg p-4">
          <main className="relative mx-auto mt-4 max-w-4xl rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
