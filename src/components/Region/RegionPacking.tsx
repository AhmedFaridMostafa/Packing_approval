import CategorySectionList from "./category/CategorySectionList";
import StickyCategoryNav from "./category/StickyCategoryNav";
import DownloadPDFButton from "./packing/DownloadPDFButton";

interface RegionPackingProps {
  groupedPacking: CategoryGroup[];
  isRTL: boolean;
  isAdmin: boolean;
  generatingPdf: string;
  downloadPdfCta: string;
  country: Country;
  region: Region;
}

const RegionPacking = ({
  groupedPacking,
  isRTL,
  isAdmin,
  generatingPdf,
  downloadPdfCta,
  country,
  region,
}: RegionPackingProps) => {
  return (
    <>
      <StickyCategoryNav groupedPacking={groupedPacking} isRTL={isRTL}>
        <DownloadPDFButton
          generatingPdf={generatingPdf}
          downloadPdfCta={downloadPdfCta}
          groupedPacking={groupedPacking}
          country={country}
          region={region}
        />
      </StickyCategoryNav>

      <div className="section-container py-10 sm:py-16">
        <DownloadPDFButton
          mobile
          generatingPdf={generatingPdf}
          downloadPdfCta={downloadPdfCta}
          groupedPacking={groupedPacking}
          country={country}
          region={region}
        />

        {/* Categories Sections */}
        <CategorySectionList
          groupedPacking={groupedPacking}
          isRTL={isRTL}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
};

export default RegionPacking;
