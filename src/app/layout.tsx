import "./[lang]/globals.css";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default async function NotFoundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
