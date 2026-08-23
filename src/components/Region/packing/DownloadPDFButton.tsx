"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface DownloadPDFButtonProps {
  mobile?: boolean;
  generatingPdf: string;
  downloadPdfCta: string;
  groupedPacking: CategoryGroup[];
  country: Country;
  region: Region;
}

const DownloadPDFButton = ({
  mobile,
  generatingPdf,
  downloadPdfCta,
  groupedPacking,
  country,
  region,
}: DownloadPDFButtonProps) => {
  const [isDownloading, startTransition] = useTransition();

  const handleDownloadPDF = () => {
    startTransition(async () => {
      try {
        const [{ pdf }, { PackingPDFDocument }] = await Promise.all([
          import("@react-pdf/renderer"),
          import("@/components/Region/packing/PackingPDFDocument"),
        ]);
        const blob = await pdf(
          <PackingPDFDocument
            groupedPacking={groupedPacking}
            country={country}
            region={region}
          />,
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${region.label_name_en}-packing-guidelines.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to generate packing PDF", error);
        toast.error("Couldn't generate the PDF. Please try again.");
      }
    });
  };

  return mobile ? (
    <div className="mb-6 flex justify-end sm:hidden">
      <Button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className="bg-primary text-primary-foreground flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold shadow-md"
      >
        {isDownloading ? (
          <>
            <Spinner className="h-5 w-5" />
            {generatingPdf}
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            {downloadPdfCta}
          </>
        )}
      </Button>
    </div>
  ) : (
    <Button
      onClick={handleDownloadPDF}
      disabled={isDownloading}
      variant="outline"
      className="border-primary/20 text-primary hover:bg-accent hidden shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all sm:inline-flex"
    >
      {isDownloading ? (
        <>
          <Spinner className="h-5 w-5" />
          {generatingPdf}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4 rtl:mr-0 rtl:ml-2" />
          {downloadPdfCta}
        </>
      )}
    </Button>
  );
};

export default DownloadPDFButton;
