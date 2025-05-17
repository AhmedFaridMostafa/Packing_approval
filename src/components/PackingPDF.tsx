/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Lang } from "@/i18n.config";
import { GroupedPacking } from "@/type/interfaces";
import { Packing } from "@/type/interfaces";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";
import Button from "./Button";
import { FaRegFilePdf } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";

// Define types
interface PackingPDFProps {
  countryName: string;
  account: string;
  labelName: string;
  labels: string;
  groupedData: GroupedPacking;
  lang: Lang;
}

type PDFStyles = ReturnType<typeof StyleSheet.create>;

// Add proper type for the message object
interface Messages {
  generating: Record<Lang, string>;
  download: Record<Lang, string>;
}

interface PackingImageProps {
  src: string | null;
  style: PDFStyles;
  uniqueKey: string;
}

// This function disables the browser cache for all images in the PDF
const getCloudinaryUrl = (publicId: string, updated_at?: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Force transformation parameters to ensure fresh image
  const transformations = "f_auto,q_auto,fl_force_strip,fl_progressive";

  // Use a consistent version based on updated_at
  const version = updated_at ? new Date(updated_at).getTime() : Date.now();

  // Build the base URL with version
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
  // Add version as a query parameter
  return `${baseUrl}?v=${version}`;
};

// Register fonts (unchanged)
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-W1Q.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hL4-W1Q.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
      fontWeight: "bold",
    },
  ],
});

const getStyles = (lang: Lang): PDFStyles => {
  const isRTL = lang === "ar";
  const fontFamily = isRTL ? "Cairo" : "Roboto";

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      padding: 30,
      fontFamily,
    },
    header: {
      marginBottom: 20,
      alignItems: isRTL ? "flex-end" : "flex-start",
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      color: "#2563eb",
      fontFamily,
      textAlign: isRTL ? "right" : "left",
    },
    subtitle: {
      fontSize: 12,
      marginBottom: 15,
      color: "#4b5563",
      fontFamily,
      textAlign: isRTL ? "right" : "left",
    },
    categoryTitle: {
      fontSize: 18,
      marginTop: 15,
      marginBottom: 10,
      color: "#2563eb",
      fontFamily,
      textAlign: isRTL ? "right" : "left",
    },
    cardsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 10,
      justifyContent: isRTL ? "flex-end" : "flex-start",
    },
    cardContent: {
      width: "31%", // Slightly reduced to ensure 3 fit with gap
      height: "auto",
      backgroundColor: "#f9fafb",
      borderRadius: 4,
      marginBottom: 10,
    },
    image: {
      width: "100%",
      height: 180, // Fixed height for images
      objectFit: "contain", // Maintain aspect ratio
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    textContainer: {
      flexDirection: "column",
      padding: 8,
    },
    cardTitle: {
      fontSize: 12,
      marginBottom: 4,
      fontFamily,
      textAlign: isRTL ? "right" : "left",
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.4,
      fontFamily,
      textAlign: isRTL ? "right" : "left",
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      marginVertical: 6,
    },
    pageNumber: {
      position: "absolute",
      fontSize: 10,
      bottom: 20,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "#6b7280",
    },
    noImage: {
      height: 180,
      backgroundColor: "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    noImageText: {
      fontSize: 10,
      color: "#6b7280",
    },
  });
};

// Add a fallback image component
const PackingImage = ({ src, style, uniqueKey }: PackingImageProps) => {
  // Since @react-pdf/renderer's Image doesn't support onError,
  // we'll just show the fallback if src is null
  if (!src) {
    return (
      <View style={style.noImage}>
        <Text style={style.noImageText}>Image not available</Text>
      </View>
    );
  }

  // We add uniqueKey to create a completely new Image component when src changes
  return <Image style={style.image} src={src} cache={false} key={uniqueKey} />;
};

// Function to split items into chunks per page
const splitItemsByPage = (items: Packing[], itemsPerPage = 6): Packing[][] => {
  const pages: Packing[][] = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }
  return pages;
};

// Create Document Component
const PackingDocument = ({
  countryName,
  account,
  labelName,
  labels,
  groupedData,
  lang,
}: PackingPDFProps) => {
  const styles = useMemo(() => getStyles(lang), [lang]);

  // Use a stable render key based on the data
  const renderKey = useMemo(() => {
    const dataString = JSON.stringify(groupedData);
    return `${Date.now()}-${dataString}`;
  }, [groupedData]);

  // Filter out invalid items
  const validItems = (items: GroupedPacking[keyof GroupedPacking]) => {
    return (
      items?.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          item.id &&
          item.title &&
          item.description &&
          typeof item.title === "object" &&
          typeof item.description === "object",
      ) || []
    );
  };

  // Process categories into pages
  const categoryPages = useMemo(() => {
    const result: Record<string, Packing[][]> = {};

    Object.entries(groupedData).forEach(([category, items]) => {
      const valid = validItems(items);
      if (valid.length > 0) {
        result[category] = splitItemsByPage(valid, 6);
      }
    });

    return result;
  }, [groupedData]);

  return (
    <Document>
      {Object.entries(categoryPages).map(([category, pageGroups]) =>
        pageGroups.map((pageItems, pageIndex) => (
          <Page
            key={`${category}-page-${pageIndex}-${renderKey}`}
            size="A4"
            style={styles.page}
          >
            {/* Header only on first page of each category */}
            {pageIndex === 0 && (
              <View style={styles.header}>
                <Text style={styles.title}>
                  {countryName} (
                  {new Date().toLocaleDateString(
                    lang === "en" ? "en-US" : "ar-EG",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                  )
                </Text>
                <Text style={styles.subtitle}>
                  {lang === "ar" ? "حساب" : "Account"}: {account} |{" "}
                  {lang === "ar" ? "ملصق" : "Label"}: {labelName} |{" "}
                  {lang === "ar" ? "ملصقات" : "Labels"}: {labels}
                </Text>
              </View>
            )}

            {/* Category title */}
            <Text style={styles.categoryTitle}>
              {category}{" "}
              {pageGroups.length > 1 &&
                `(${pageIndex + 1}/${pageGroups.length})`}
            </Text>

            {/* Items in grid layout - 3 per row, 2 rows max per page */}
            <View style={styles.cardsRow}>
              {pageItems.map((item) => {
                // Create a stable key based on the item's data
                const itemKey = `${item.id}-${item.updated_at || ""}-${renderKey}`;

                return (
                  <View key={itemKey} style={styles.cardContent}>
                    <PackingImage
                      style={styles}
                      src={
                        item.image_url
                          ? getCloudinaryUrl(item.image_url, item.updated_at)
                          : null
                      }
                      uniqueKey={itemKey}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>{item.title[lang]}</Text>
                      <View style={styles.divider} />
                      <Text style={styles.cardDescription}>
                        {item.description[lang]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Page number */}
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        )),
      )}
    </Document>
  );
};

// PackingPDFRenderer component
const PackingPDFRenderer = (props: PackingPDFProps) => {
  const [isClient, setIsClient] = useState(false);

  // Create a stable key based on the props
  const documentKey = useMemo(() => {
    const propsString = JSON.stringify(props);
    return `${Date.now()}-${propsString}`;
  }, [props]);

  const messages: Messages = useMemo(
    () => ({
      generating: { en: "Generating PDF...", ar: "جاري إنشاء ملف PDF..." },
      download: { en: "Download PDF", ar: "تنزيل ملف PDF" },
    }),
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return <Button disabled={true}>Loading...</Button>;

  // Generate a filename with the current date
  const filename = `${props.countryName}-${new Date().toISOString().split("T")[0]}.pdf`;

  return (
    <PDFDownloadLink
      key={documentKey}
      document={<PackingDocument {...props} />}
      fileName={filename}
      className="no-cache"
    >
      {({ loading, error: pdfError }) => (
        <Button type="button" disabled={loading}>
          {loading ? (
            messages.generating[props.lang]
          ) : pdfError ? (
            `Error: ${pdfError}`
          ) : (
            <div className="flex items-center justify-center gap-2">
              <FaRegFilePdf className="h-6 w-6" />
              {messages.download[props.lang]}
            </div>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PackingPDFRenderer;
