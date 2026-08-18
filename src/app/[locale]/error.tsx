"use client";

import ErrorState from "@/components/shared/ErrorState";

export default function Error({ error }: { error: Error }) {
  return <ErrorState layout="page" message={error.message} />;
}
