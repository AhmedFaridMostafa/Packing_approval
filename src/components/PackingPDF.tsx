/* eslint-disable jsx-a11y/alt-text */
"use client";
import { Lang } from "@/i18n.config";
import { GroupedPacking } from "@/type/interfaces";

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

// Cloudinary URL builder
const getCloudinaryUrl = (publicId: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  // Remove the 'v1/' part and use proper transformations
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
};

// Register Cairo (Arabic)
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

// Register Roboto (English)
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

// Create dynamic styles based on language
const getStyles = (lang: Lang) => {
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
      marginBottom: 30,
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
      marginBottom: 20,
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
    cardContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 20,
      justifyContent: isRTL ? "flex-end" : "flex-start",
    },
    cardContent: {
      width: "30%",
      minHeight: 150,
      backgroundColor: "#f9fafb",
      borderRadius: 4,
    },
    image: {
      width: "100%",
      objectFit: "cover",
      borderRadius: 4,
      marginBottom: 8,
    },
    textContainer: {
      flexDirection: "column",
      gap: 4,
      padding: 8,
    },
    cardTitle: {
      fontSize: 14,
      marginBottom: 4,
      fontFamily,
      textAlign: isRTL ? "right" : "left",
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 10,
      color: "#4b5563",
      lineHeight: 1.5,
      fontFamily,
      textAlign: isRTL ? "right" : "left",
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      marginVertical: 8,
    },
  });
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
  const styles = getStyles(lang);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{countryName}</Text>
          <Text style={styles.subtitle}>
            {lang === "ar" ? "حساب" : "Account"}: {account} |{" "}
            {lang === "ar" ? "ملصق" : "Label"}: {labelName} |{" "}
            {lang === "ar" ? "ملصقات" : "Labels"}: {labels}
          </Text>
        </View>

        {Object.entries(groupedData).map(([category, items]) => (
          <View key={category} wrap={false}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.cardContainer} wrap={true}>
              {items.map((item) => (
                <View key={item.id} style={styles.cardContent}>
                  <Image
                    style={styles.image}
                    src={getCloudinaryUrl(item.image_url)}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.title[lang]}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.cardDescription}>
                      {item.description[lang]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

// Create Download Component
const PackingPDFRenderer = (props: PackingPDFProps) => {
  const massage = useMemo(
    () => ({
      generating: { en: "Generating PDF...", ar: "جاري إنشاء ملف PDF..." },
      download: { en: "Download PDF", ar: "تنزيل ملف PDF" },
    }),
    [],
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Button status={true}>Loading...</Button>;

  return (
    <PDFDownloadLink
      document={<PackingDocument {...props} />}
      fileName={props.countryName}
    >
      {({ loading }) => (
        <Button type="button">
          {loading ? (
            massage.generating[props.lang]
          ) : (
            <div className="flex items-center justify-center">
              <FaRegFilePdf className="h-10 w-10" />
              {massage.download[props.lang]}
            </div>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PackingPDFRenderer;
