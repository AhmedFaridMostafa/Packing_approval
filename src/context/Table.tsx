"use client";
import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-sm">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th scope="col" className="px-6 py-3">
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  isLast = false,
}: {
  children: ReactNode;
  isLast?: boolean;
}) {
  return (
    <tr
      className={`bg-white dark:bg-gray-800 ${
        !isLast && "border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  isHeader = false,
}: {
  children: ReactNode;
  isHeader?: boolean;
}) {
  const baseClasses = "px-6 py-4";

  if (isHeader) {
    return (
      <th
        scope="row"
        className={`${baseClasses} whitespace-nowrap font-medium text-gray-900 dark:text-white`}
      >
        {children}
      </th>
    );
  }

  return <td className={baseClasses}>{children}</td>;
}
