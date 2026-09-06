import { getCldImageUrl } from "next-cloudinary";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#0037b0",
    paddingBottom: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#0037b0",
    marginBottom: 4,
  },
  titleAr: {
    fontFamily: "Cairo",
    fontWeight: "bold",
    fontSize: 15,
    color: "#0037b0",
    textAlign: "right",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 6,
  },
  metaItem: {
    fontSize: 10,
    color: "#71717A",
  },
  bold: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#1a1b23",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#0037b0",
    marginTop: 20,
    marginBottom: 2,
  },
  sectionTitleAr: {
    fontFamily: "Cairo",
    fontWeight: "bold",
    fontSize: 13,
    color: "#0037b0",
    textAlign: "right",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eff6ff",
    paddingBottom: 4,
  },
  card: {
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cardImage: {
    width: 240,
    height: 240,
    borderRadius: 6,
    objectFit: "contain",
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 11,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#1a1b23",
    marginBottom: 2,
  },
  cardTitleAr: {
    fontFamily: "Cairo",
    fontWeight: "bold",
    fontSize: 11,
    color: "#1a1b23",
    textAlign: "right",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 9,
    color: "#434655",
    lineHeight: 1.5,
  },
  cardDescAr: {
    fontFamily: "Cairo",
    fontWeight: "normal",
    fontSize: 9,
    color: "#434655",
    textAlign: "right",
    lineHeight: 1.6,
    marginTop: 4,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#A1A1AA",
  },
});

interface PackingPDFDocumentProps {
  groupedPacking: CategoryGroup[];
  country: Country;
  region: Region;
}

export function PackingPDFDocument({
  country,
  region,
  groupedPacking,
}: PackingPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {country.name_en} - {region.label_name_en}
          </Text>
          <Text style={styles.titleAr}>
            {country.name_ar} - {region.label_name_ar}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>
              Account: <Text style={styles.bold}>{region.account}</Text>
            </Text>
            {region.labels.length > 0 && (
              <Text style={styles.metaItem}>
                Labels:{" "}
                <Text style={styles.bold}>{region.labels.join(", ")}</Text>
              </Text>
            )}
          </View>
        </View>

        {/* Content categories list */}
        {groupedPacking.map((group) => (
          <View key={group.category.id}>
            <Text style={styles.sectionTitle}>{group.category.name_en}</Text>
            <Text style={styles.sectionTitleAr}>{group.category.name_ar}</Text>

            {group.items.map((item) => (
              <View key={item.id} style={styles.card} wrap={false}>
                {item.image_url && (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Image
                    src={getCldImageUrl({
                      src: item.image_url,
                      quality: 100,
                      width: 240,
                      height: 240,
                      crop: "fit",
                    })}
                    style={styles.cardImage}
                  />
                )}
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.title_en}</Text>
                  <Text style={styles.cardTitleAr}>{item.title_ar}</Text>
                  {item.description_en && (
                    <Text style={styles.cardDesc}>{item.description_en}</Text>
                  )}
                  {item.description_ar && (
                    <Text style={styles.cardDescAr}>{item.description_ar}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
