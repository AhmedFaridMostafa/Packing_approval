function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/60 dark:bg-gray-900/60">
      <div className="max-h-[calc(100vh-2rem)]">{children}</div>
    </div>
  );
}

export default Overlay;
