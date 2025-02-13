function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-screen max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-300/[0.6] dark:bg-gray-900/[0.6] md:inset-0">
      {children}
    </div>
  );
}

export default Overlay;
