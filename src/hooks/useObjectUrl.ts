"use client";

import { useEffect, useMemo } from "react";
import { convertFileToUrl } from "@/lib/utils";

const useObjectUrl = (file?: File) => {
  const url = useMemo(
    () => (file ? convertFileToUrl(file) : undefined),
    [file],
  );

  useEffect(() => {
    if (!url) return;
    return () => URL.revokeObjectURL(url);
  }, [url]);

  return url;
};
export default useObjectUrl;
