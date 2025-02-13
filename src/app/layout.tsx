import "./[lang]/globals.css";

export default async function NotFoundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center">
        {children}
      </body>
    </html>
  );
}
