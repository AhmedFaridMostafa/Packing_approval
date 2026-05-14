import { db } from "./db";
import { categories, country, packing, region } from "./schema";
import slugify from "slugify";

const oldDateCountry = [
  {
    id: 1,
    label_name: "HBE EUROPE LEVIS",
    flag_url: "https://flagcdn.com/eu.svg",
    country_name: {
      ar: "أوروبا",
      en: "Europe",
    },
    account: "H494M",
    labels: "JW-JK-JQ-JV-JR-LQ-LR-LV-LW-LY-LZ-JT",
  },
  {
    id: 2,
    label_name: "INTERNATIONAL APPAREL CORP",
    flag_url: "https://flagcdn.com/pa.svg",
    country_name: {
      ar: "بنما",
      en: "Panama",
    },
    account: "I644M",
    labels: "IA-NL",
  },
  {
    id: 3,
    label_name: "INNOVA SPORT MEXICO",
    flag_url: "https://flagcdn.com/mx.svg",
    country_name: {
      ar: "المكسيك",
      en: "Mexico",
    },
    account: "I201M",
    labels: "KO-MH-MK-MO-MV",
  },
  {
    id: 4,
    label_name: "CENTRAL DEPARTMENT STORE LTD",
    flag_url: "https://flagcdn.com/th.svg",
    country_name: {
      ar: "تايلاند",
      en: "Thailand",
    },
    account: "C104M",
    labels: "G0-G8-G9-H0",
  },
  {
    id: 5,
    label_name: "CHILE IAC",
    flag_url: "https://flagcdn.com/cl.svg",
    country_name: {
      ar: "تشيلي",
      en: "Chile",
    },
    account: "I867M",
    labels: "XL",
  },
  {
    id: 6,
    label_name: "AL-SRAD",
    flag_url: "https://flagcdn.com/il.svg",
    country_name: {
      ar: "إسرائيل",
      en: "Israel",
    },
    account: "A746M",
    labels: "AL",
  },
  {
    id: 7,
    label_name: "KOREA ALT PACKING",
    flag_url: "https://flagcdn.com/kr.svg",
    country_name: {
      ar: "كوريا",
      en: "Korea",
    },
    account: "H718M",
    labels: "KL-KM-KS-KX",
  },
  {
    id: 8,
    label_name: "ZAFARI PANAMA",
    flag_url: "https://flagcdn.com/pa.svg",
    country_name: {
      ar: "بنما زافاري",
      en: "Zafari Panama",
    },
    account: "Z090M",
    labels: "SV",
  },
  {
    id: 15,
    label_name: "(CANADA - STOCK)-(CANADA - WINNERS)",
    flag_url: "https://flagcdn.com/ca.svg",
    country_name: {
      en: "Canada",
      ar: "كندا",
    },
    account: "W846M",
    labels: "WN-CN",
  },
  {
    id: 16,
    label_name: "STREAM MALAYSIA",
    flag_url: "https://flagcdn.com/my.svg",
    country_name: {
      en: "Malaysia",
      ar: "ماليزيا",
    },
    account: "S960M",
    labels: "F5",
  },
  {
    id: 17,
    label_name: "SKYE",
    flag_url: "https://flagcdn.com/za.svg",
    country_name: {
      en: "South Africa",
      ar: "جنوب أفريقيا",
    },
    account: "S974M",
    labels: "SY",
  },
  {
    id: 18,
    label_name: "DUBAI",
    flag_url: "https://flagcdn.com/ae.svg",
    country_name: {
      en: "Dubai",
      ar: "دبي",
    },
    account: "A313M",
    labels: "QO",
  },
  {
    id: 19,
    label_name: "INDIA APPAREL GROUP",
    flag_url: "https://flagcdn.com/in.svg",
    country_name: {
      en: "India",
      ar: "الهند",
    },
    account: "A311M",
    labels: "X0",
  },
  {
    id: 20,
    label_name: "PERU IAC",
    flag_url: "https://flagcdn.com/pe.svg",
    country_name: {
      en: "Peru",
      ar: "بيرو",
    },
    account: "I952M",
    labels: "W4",
  },
  {
    id: 21,
    label_name: "LEURU S.A. ARGENTINA",
    flag_url: "https://flagcdn.com/ar.svg",
    country_name: {
      en: "Argentina",
      ar: "الأرجنتين",
    },
    account: "L014M",
    labels: "LU",
  },
  {
    id: 22,
    label_name: "MAP GROUP",
    flag_url: "https://flagcdn.com/id.svg",
    country_name: {
      en: "Indonesia",
      ar: "إندونيسيا",
    },
    account: "M844M",
    labels: "MG",
  },
] as const;

const OldDateCategories = [
  {
    id: 1,
    name: {
      ar: "كرتون",
      en: "carton",
    },
  },
  {
    id: 2,
    name: {
      ar: "ملصق",
      en: "sticker",
    },
  },
  {
    id: 3,
    name: {
      ar: "طريقه التعبئه والتغليف",
      en: "packing way",
    },
  },
  {
    id: 4,
    name: {
      ar: "شماعة",
      en: "hanger",
    },
  },
  {
    id: 5,
    name: {
      ar: "معلومات اضافية",
      en: "addition information",
    },
  },
] as const;

const OldDatePackingWay = [
  {
    id: 34,
    region_id: 15,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "Short Side",
    },
    description: {
      ar: "يتضمن الملصق معلومات مثل رقم النمط (**887956-023-WN**)\r\n ورقم الطلب (**PO # CA# 129301**).  \r\nيجب أن يكون الصندوق مُحددًا بعلامة **HADDAD APPAREL GROUP CANADA**.",
      en: "The label includes information such as the style number (**887956-023-WN**)\r\n and order number (**PO # CA# 129301**).\r\nThe box must be marked with **HADDAD APPAREL GROUP CANADA**.",
    },
    image_url: "Canada_carton_Short_Side",
    updated_at: "",
  },
  {
    id: 36,
    region_id: 15,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "الصندوق يتضمن تفاصيل مثل رقم النمط ومعلومات المورد، مثل أمر الشراء في كندا (Canada PO).  \r\nأبعاد الصندوق هي:  \r\n- الحد الأدنى: الطول 12 × العرض 9 × الارتفاع 4  \r\n- الحد الأقصى: الطول 35 × العرض 23 × الارتفاع 18  \r\n\r\nوزن الصندوق:  \r\n- الحد الأدنى: 2 أرطال  \r\n- الحد الأقصى: 40 رطلاً  \r\n\r\nيجب أن تحتوي جميع الكراتين على ختم شهادة مصنع الصناديق (BMC - BOX MANUFACTURER CERTIFICATE STAMP) في الجزء السفلي من كل كرتونة.",
      en: "The box contains details such as the style number and vendor information, including the Canada PO.  \r\n\r\n**Box Measurements:**  \r\n- **Minimum:** L12 × W9 × H4  \r\n- **Maximum:** L35 × W23 × H18  \r\n\r\n**Box Weight:**  \r\n- **Minimum:** 2 lbs  \r\n- **Maximum:** 40 lbs  \r\n\r\nAll cartons must have the **BMC (Box Manufacturer Certificate Stamp)** on the bottom of each carton.",
    },
    image_url: "carton/Canada_carton_Down_carton",
    updated_at: "2026-03-16 09:16:59.005+00",
  },
  {
    id: 37,
    region_id: 15,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: "الصندوق يتضمن تفاصيل مثل رقم النمط ومعلومات المورد، مثل أمر الشراء في كندا (Canada PO).",
      en: "The box contains details such as the style number and vendor information, including the Canada PO.",
    },
    image_url: "carton/Canada_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 38,
    region_id: 15,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "تتضمن الملصق معلومات مثل رقم النمط (**887956-023-WN**) \r\nورقم الطلب (**PO # CA# 129301**).  \r\nيجب أن يحمل الصندوق العلامة **DIV. 7: HADDAD CANADA SHIP TO**.",
      en: "The label includes information such as the style number (**887956-023-WN**) \r\nand order number (**PO # CA# 129301**).  \r\nThe box must be marked with **DIV. 7: HADDAD CANADA SHIP TO**.",
    },
    image_url: "carton/Canada_carton_Long_side",
    updated_at: "",
  },
  {
    id: 39,
    region_id: 15,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **RFID ** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون باللغتين الإنجليزية والفرنسية، كود UPC، والسعر**.",
      en: "REGULAR RFID STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR DESCRIPTION IN ENGLISH/FRENCH, UPC CODE & PRICE ON THEM.",
    },
    image_url: "sticker/Canada_sticker_Hangtag_sticker",
    updated_at: "2025-12-27 08:31:52.169+00",
  },
  {
    id: 41,
    region_id: 15,
    category_id: 2,
    title: {
      ar: "ملصق الشماعة",
      en: "Hanger sticker",
    },
    description: {
      ar: "يجب أن تحتوي جميع الشماعات على ملصق شماعة مثبت عليها.",
      en: "All hangers must have a hanger sticker attached to them.",
    },
    image_url: "sticker/Canada_sticker_Hanger_sticker",
    updated_at: "",
  },
  {
    id: 42,
    region_id: 15,
    category_id: 3,
    title: {
      ar: "تعبئة الملابس",
      en: "Garment packing",
    },
    description: {
      ar: "وضعنا شماعة لكل العناصر.",
      en: "We placed a hanger for all the items.",
    },
    image_url: "packing way/Canada_packing_way_Garment_packing",
    updated_at: "",
  },
  {
    id: 43,
    region_id: 15,
    category_id: 4,
    title: {
      ar: "شماعة (467B)",
      en: "Hanger (467B)",
    },
    description: {
      ar: "شماعة سوداء مناسبة للمقاسات من الصغير إلى الكبير جدًا \r\n(S إلى XL)",
      en: "A black hanger suitable for sizes small to extra-large (S to XL);",
    },
    image_url: "Canada_hanger_Hanger__467B_",
    updated_at: "",
  },
  {
    id: 44,
    region_id: 15,
    category_id: 3,
    title: {
      ar: "الملابس في الكرتون",
      en: "Garment in carton",
    },
    description: {
      ar: "يجب أن يتناسب الثوب داخل الكرتونة.",
      en: "The garment must fit inside the carton.",
    },
    image_url: "packing way/Canada_packing_way_Garment_in_carton",
    updated_at: "",
  },
  {
    id: 45,
    region_id: 15,
    category_id: 4,
    title: {
      ar: "شماعة (472)",
      en: "Hanger (472)",
    },
    description: {
      ar: "شماعة بيضاء مناسبة للمقاسات من الصغير إلى الكبير جدًا (4 إلى 7).",
      en: "A white hanger suitable for sizes small to extra-large (4 to 7);",
    },
    image_url: "hanger/Canada_hanger_Hanger__472_",
    updated_at: "",
  },
  {
    id: 46,
    region_id: 15,
    category_id: 5,
    title: {
      ar: "الكرت",
      en: "Hangtag",
    },
    description: {
      ar: "يجب أن تحتوي بطاقة العلامة التجارية (Hangtag) على وصف باللغتين الإنجليزية والفرنسية، ويجب وضعها في **الزاوية اليسرى السفلى من الكم** داخل حلقة البطاقة باستخدام خيط شفاف بطول **7.5 سم**.",
      en: "The hangtag must include descriptions in both English and French, and it should be placed at the left bottom sleeve in the hangtag loop using a clear string of 7.5 cm in length.",
    },
    image_url: "addition information/Canada_addition_information_Hangtag",
    updated_at: "2026-03-16 09:18:16.196+00",
  },
  {
    id: 47,
    region_id: 16,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "Malaysia_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 48,
    region_id: 16,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "علامات حداد مع الأسلوب، اللون، والملصق 988708-F81-F5.",
      en: "Haddad Brands with style, color, and label 988708-F81-F5.",
    },
    image_url: "carton/Malaysia_carton_short_side",
    updated_at: "",
  },
  {
    id: 49,
    region_id: 16,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "جانب طويل من الكرتون يحمل رقم تتبع وعنوان شحن إلى شركة في ماليزيا.",
      en: "A long side of the carton is labeled with a tracking number and shipping address to a company in Malaysia.",
    },
    image_url: "carton/Malaysia_carton_long_side",
    updated_at: "",
  },
  {
    id: 50,
    region_id: 16,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، والسعر**.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE & PRICE ON THEM.",
    },
    image_url: "Malaysia_sticker_Hangtag_sticker",
    updated_at: "",
  },
  {
    id: 51,
    region_id: 16,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Malaysia_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 52,
    region_id: 16,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان ماليزيا.",
      en: "The address of Malaysia.",
    },
    image_url: "sticker/Malaysia_sticker_Address",
    updated_at: "",
  },
  {
    id: 53,
    region_id: 16,
    category_id: 3,
    title: {
      ar: "تعبئة تيشرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "وضعنا شماعة وكيس فرداني مغلق لكل تيشرت.",
      en: "We placed a hanger and a sealed individual bag for each T-shirt.",
    },
    image_url: "packing way/Malaysia_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 54,
    region_id: 16,
    category_id: 3,
    title: {
      ar: "كيس بلاستيكي رئيسي",
      en: "Master polybag",
    },
    description: {
      ar: "نضع جميع الملابس في كيس مجموعة.",
      en: "We place all the clothes in a master polybag.",
    },
    image_url: "packing way/Malaysia_packing_way_Master_polybag",
    updated_at: "",
  },
  {
    id: 55,
    region_id: 16,
    category_id: 3,
    title: {
      ar: "الملابس في الكرتون",
      en: "Garment in carton",
    },
    description: {
      ar: "يجب أن يتناسب الثوب داخل الكرتونة.",
      en: "The garment must fit inside the carton.",
    },
    image_url: "packing way/Malaysia_packing_way_Garment_in_carton",
    updated_at: "",
  },
  {
    id: 56,
    region_id: 16,
    category_id: 4,
    title: {
      ar: "شماعة بدون ملصق",
      en: "hanger without sticker",
    },
    description: {
      ar: "شماعة بدون ملصق",
      en: "hanger without a sticker",
    },
    image_url: "hanger/Malaysia_hanger_hanger_without_sticker",
    updated_at: "",
  },
  {
    id: 57,
    region_id: 16,
    category_id: 4,
    title: {
      ar: "شماعة (467B)",
      en: "Hanger (467B)",
    },
    description: {
      ar: "شماعة سوداء مناسبة للمقاسات من صغير إلى كبير جدًا (S إلى XL) (أولاد فقط).",
      en: "A black hanger suitable for sizes small to extra-large (S to XL) (only Boys).",
    },
    image_url: "hanger/Malaysia_hanger_Hanger__467B_",
    updated_at: "",
  },
  {
    id: 58,
    region_id: 16,
    category_id: 4,
    title: {
      ar: "شماعة (472)",
      en: "Hanger (472)",
    },
    description: {
      ar: "شماعة بيضاء مناسبة للمقاسات من صغير إلى كبير جدًا (4 إلى 7)، \r\nوأيضًا مناسبة للمقاسات من صغير إلى كبير جدًا (S إلى XL) - (بنات فقط).",
      en: "A white hanger suitable for sizes small to extra-large (4 to 7) \r\nand also suitable for sizes small to extra-large (S to XL)\r\n (Girls only).",
    },
    image_url: "Malaysia_hanger_Hanger__472_",
    updated_at: "",
  },
  {
    id: 59,
    region_id: 16,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url: "addition information/Malaysia_addition_information_Care_label",
    updated_at: "",
  },
  {
    id: 60,
    region_id: 16,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Malaysia_carton_Down_carton",
    updated_at: "",
  },
  {
    id: 61,
    region_id: 8,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" sticker',
      en: '"Haddad Brands" sticker',
    },
    image_url: "carton/Zafari_Panama_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 62,
    region_id: 8,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: '"علامة Haddad Brands" مع ختم DICE.',
      en: '"Haddad Brands"  with DICE stamp',
    },
    image_url: "carton/Zafari_Panama_carton_Down_carton",
    updated_at: "",
  },
  {
    id: 63,
    region_id: 8,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "المعلومات أدناه تتعلق بتفاصيل موديلات Haddad.",
      en: "The information BELOW IS RELATED TO HADDAD STYLE DETAILS",
    },
    image_url: "carton/Zafari_Panama_carton_short_side",
    updated_at: "2025-05-15 07:47:18.358+00",
  },
  {
    id: 64,
    region_id: 8,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "مُعلَّم برقم الموديل، والوصف، والعلامة التجارية.",
      en: "labeled with a number style, description, and brand.",
    },
    image_url: "carton/Zafari_Panama_carton_long_side",
    updated_at: "2025-05-15 07:55:22.598+00",
  },
  {
    id: 65,
    region_id: 8,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Zafari_Panama_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 66,
    region_id: 8,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، والسعر**.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE & PRICE ON THEM.",
    },
    image_url: "sticker/Zafari_Panama_sticker_Hangtag_sticker",
    updated_at: "",
  },
  {
    id: 67,
    region_id: 8,
    category_id: 2,
    title: {
      ar: "تفاصيل أزياء حداد",
      en: "HADDAD STYLE DETAILS",
    },
    description: {
      ar: '" \r\nINVOICE NO:- (فاتورة حداد) - لا يجب طباعتها ولكن يجب تضمينها على الكرتون\r\n"\r\n" \r\nDESCRIPTION:- وصف المنتج / موديل حداد\r\n"\r\n" \r\nREFERENCE:- رقم مرجع حداد\r\n"\r\n" \r\nCOLOR:- وصف لون حداد\r\n"\r\n" \r\nSIZE & RATIO:- المقاسات والنسبة: S/M/L/XL\r\n"\r\n" \r\n:- 1/2/2/1\r\n"\r\n" \r\nQTY:- ٢٤ قطعة\r\n"\r\n" \r\nCARTON NO:- رقم الكرتون حسب الإنتاج\r\n"\r\n" \r\nN.W:- الوزن الصافي (كجم)\r\n"\r\n" \r\nG.W:- الوزن الإجمالي (كجم)\r\n"\r\n" \r\nCARTON SIZE:- أبعاد الكرتون (سم)\r\n"\r\n" \r\nCBM:- الحجم بالمتر المكعب (CBMS)\r\n"\r\n" \r\nLOT OR BATCH:- فارغ (اتركه فارغًا)\r\n"\r\n" \r\nCOUNTRY OF ORIGIN:- استخدم بلد المنشأ الصحيح\r\n"',
      en: '" \r\nINVOICE NO:- (Haddad Invoice) - DOES NOT HAVE TO BE PRINTED - BUT MUST BE INCLUDED ON CARTON\r\n"\r\n" \r\nDESCRIPTION:- HADDAD STYLE/PRODUCT DESCRIPTION\r\n"\r\n" \r\nREFERENCE:- HADDAD REFERENCE#\r\n"\r\n" \r\nCOLOR:- HADDAD COLOR DESCRIPTION\r\n"\r\n" \r\nSIZE & RATIO:- S/M/L/XL\r\n"\r\n" \r\n:- 1/2/2/1\r\n"\r\n" \r\nQTY:- 24 PCS\r\n"\r\n" \r\nCARTON NO:- Carton number per your production\r\n"\r\n" \r\nN.W:- KG\r\n"\r\n" \r\nG.W:- KG\r\n"\r\n" \r\nCARTON SIZE:- CM\r\n"\r\n" \r\nCBM:- CBMS\r\n"\r\n" \r\nLOT OR BATCH:- BLANK (Keep it in blank)\r\n"\r\n" \r\nCOUNTRY OF ORIGIN:- USE CORRECT COUNTRY OF ORIGIN\r\n"',
    },
    image_url: "sticker/Zafari_Panama_sticker_HADDAD_STYLE_DETAILS",
    updated_at: "2025-05-15 07:45:14.807+00",
  },
  {
    id: 68,
    region_id: 8,
    category_id: 2,
    title: {
      ar: "الباركود",
      en: "Barcode",
    },
    description: {
      ar: "تم إنشاء الباركود باستخدام رقم مرجع Haddad ورمز اللون.",
      en: "Barcode created using Haddad reference number and color code.",
    },
    image_url: "sticker/Zafari_Panama_sticker_Barcode",
    updated_at: "",
  },
  {
    id: 69,
    region_id: 8,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط العنق الداخلي.",
      en: "We plate the T-shirt and attach the hangtag to the inner collar tape.",
    },
    image_url: "packing way/Zafari_Panama_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 70,
    region_id: 8,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/Zafari_Panama_packing_way_individual_bag",
    updated_at: "",
  },
  {
    id: 71,
    region_id: 8,
    category_id: 3,
    title: {
      ar: "كيس بلاستيكي مجموعه",
      en: "Master polybag",
    },
    description: {
      ar: "نضع كل مجموعة مكونة من 6 قطع ملابس في كيس بولي ماستر بناءً على النسبة.",
      en: "We put each set of 6 garments in a master polybag based on the ratio.",
    },
    image_url: "packing way/Zafari_Panama_packing_way_Master_polybag",
    updated_at: "",
  },
  {
    id: 72,
    region_id: 8,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url:
      "addition information/Zafari_Panama_addition_information_Care_label",
    updated_at: "",
  },
  {
    id: 73,
    region_id: 8,
    category_id: 5,
    title: {
      ar: "ملصق إضافي",
      en: "Additional label",
    },
    description: {
      ar: "معلومات الملصق لشركة Zafari Global.",
      en: "Label information for Zafari Global.",
    },
    image_url:
      "addition information/Zafari_Panama_addition_information_Additional_label",
    updated_at: "",
  },
  {
    id: 74,
    region_id: 17,
    category_id: 1,
    title: {
      ar: "كرتون علوي وسفلي",
      en: "Upper and Down carton",
    },
    description: {
      ar: "يجب أن تكون الصناديق العلوية والسفلية فارغة دون أي نص.",
      en: "The upper and lower cartons must be blank, with no text.",
    },
    image_url: "carton/South_Africa_carton_Upper_and_Down_carton",
    updated_at: "",
  },
  {
    id: 75,
    region_id: 17,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "الجانب الطويل من الكرتونة يحتوي على ملصق. يتضمن المعلومات التالية:\r\n\r\nSPACOR\r\n\r\nجوهانسبرغ\r\n\r\nCTNS. 1 - 20 (تشير إلى عدد الصناديق الموجودة، من 1 إلى 20)\r\n\r\nرمز المستورد: 20845747 (رمز فريد لأغراض الاستيراد)\r\n\r\nصُنع في مصر (دولة المنشأ)",
      en: "The long side of the carton has a sticker. It includes the following information:\r\n\r\nSPACOR\r\n\r\nJOHANNESBURG\r\n\r\nCTNS. 1 - 20 (indicating the number of cartons contained within, ranging from 1 to 20)\r\n\r\nIMPORTERS CODE: 20845747 (a unique code for import purposes)\r\n\r\nMADE IN EGYPT (the country of origin)",
    },
    image_url: "carton/South_Africa_carton_long_side",
    updated_at: "",
  },
  {
    id: 76,
    region_id: 17,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "Short side",
    },
    description: {
      ar: "المعلومات أدناه تتعلق بتفاصيل موديلات Haddad.",
      en: "The information BELOW IS RELATED TO HADDAD STYLE DETAILS",
    },
    image_url: "carton/South_Africa_carton_Short_side",
    updated_at: "",
  },
  {
    id: 77,
    region_id: 17,
    category_id: 2,
    title: {
      ar: "ملصق بطاقة السعر وملصق بولي فردي.",
      en: "Hangtag sticker and individual poly sticker.",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، والسعر**.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE & PRICE ON THEM.",
    },
    image_url:
      "sticker/South_Africa_sticker_Hangtag_sticker_and_individual_poly_sticker_",
    updated_at: "",
  },
  {
    id: 78,
    region_id: 17,
    category_id: 2,
    title: {
      ar: "ملصق كيس ماستر وملصق الكرتون",
      en: "Master polybag sticker and carton",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الموديل، وصف اللون، رمز العبوة، رمز\r\n SKU،\r\nUPC.",
      en: "The sticker must include the style name, color description, pack code, SKU code, and UPC.",
    },
    image_url: "South_Africa_sticker_Master_polybag_sticker_and_carton",
    updated_at: "",
  },
  {
    id: 79,
    region_id: 17,
    category_id: 2,
    title: {
      ar: "ملصق كرتوني",
      en: "Carton Sticker",
    },
    description: {
      ar: 'ملصق الكرتونة الموضوع على الجانب القصير:\r\n\r\nSKU: رقم وحدة حفظ المخزون (C0302018211405128) يحدد المنتج بوضوح.\r\n\r\nالاسم: يتم إدراج اسم المنتج كـ "M SOWETO RED HOODIE"، مما يشير إلى هوديز مقاس ميديام باللون الأحمر من سويتو، ويحتمل أن يشير إلى مكان المنشأ أو الإلهام التصميمي.\r\n\r\nاللون: يتم تحديد اللون كـ "أحمر".\r\n\r\nالتعبئة: يشير هذا القسم إلى تكوين التعبئة: 14 وحدة في الكيس الداخلي، و 20 كيسًا داخليًا في الكرتونة.\r\n\r\nالوحدات: يتم توضيح العدد الإجمالي للوحدات في الكرتونة (120) بوضوح.\r\n\r\nG.W.KGS و N.W.KGS: من المحتمل أن تشير هذه إلى الوزن الإجمالي والوزن الصافي بالكيلوغرام. تم استبدال القيم بـ "الكتابة اليدوية"، مما يشير إلى أن هذه القيم قد أُضيفت يدويًا.\r\n\r\nالأبعاد: يتم إعطاء أبعاد الكرتونة كـ 63 سم × 40 سم × 29 سم.',
      en: 'Carton sticker placed on the short side:\r\n\r\nSKU: The Stock Keeping Unit number (C0302018211405128) clearly identifies the product.\r\n\r\nNAME: The product name is listed as "M SOWETO RED HOODIE," indicating medium-sized hoodies in red from Soweto, likely referring to the place of origin or design inspiration.\r\n\r\nCOLOUR: The colour is specified as RED.\r\n\r\nPACK: This section indicates the packaging configuration: 14 units per inner pack, and 20 inner packs per carton.\r\n\r\nUNITS: The total number of units in the carton (120) is clearly stated.\r\n\r\nG.W.KGS and N.W.KGS: These likely denote Gross Weight and Net Weight in kilograms. The values are replaced by "HAND WRITING," suggesting that these values were added manually.\r\n\r\nMEAS: The dimensions of the carton are given as 63cm x 40cm x 29cm.',
    },
    image_url: "sticker/South_Africa_sticker_Carton_Sticker",
    updated_at: "",
  },
  {
    id: 80,
    region_id: 17,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/South_Africa_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 81,
    region_id: 17,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "Individual bag With Sticker Poly",
    },
    description: {
      ar: "نضع كل قطعة ملابس في كيس فردي ونضع ملصقًا على الكيس الفردي.",
      en: "We put every garment in an individual bag and place a sticker on the individual bag.",
    },
    image_url:
      "packing way/South_Africa_packing_way_Individual_bag_With_Sticker_Poly",
    updated_at: "",
  },
  {
    id: 82,
    region_id: 17,
    category_id: 3,
    title: {
      ar: "كيس بلاستيكي رئيسي مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع جميع الملابس في كيس بولي ماستر ونضع ملصقًا على كيس البولي الماستر.",
      en: "We place all the clothes in a master polybag and put a sticker on the master polybag.",
    },
    image_url:
      "packing way/South_Africa_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "",
  },
  {
    id: 83,
    region_id: 17,
    category_id: 3,
    title: {
      ar: "الملابس داخل الصندوق",
      en: "Garment inside Box",
    },
    description: {
      ar: "يجب أن يتناسب الثوب مع حجم الكرتون.",
      en: "The garment must fit inside the carton.",
    },
    image_url: "packing way/South_Africa_packing_way_Garment_inside_Box",
    updated_at: "",
  },
  {
    id: 84,
    region_id: 17,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url:
      "addition information/South_Africa_addition_information_care_label",
    updated_at: "",
  },
  {
    id: 85,
    region_id: 18,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Dubai_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 86,
    region_id: 18,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يجب أن يحتوي الكرتون على رقم الستايل ومعلومات المورد، ويجب ألا تقل أبعاده عن 11.8 × 11.8 × 11.8 بوصة، مع إمكانية تعديل الارتفاع لتقليل الفراغ داخل الكرتون.",
      en: "The box includes details like the style number, vendor information, and must minimum dimensions of 11.8 x 11.8 x 11.8 inches (height can be adjusted to minimize space).",
    },
    image_url: "Dubai_carton_Down_carton",
    updated_at: "2026-01-19 12:33:02.24+00",
  },
  {
    id: 87,
    region_id: 18,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "علامات حداد مع الأسلوب، اللون، والملصق \r\n91N781-G52-QO.",
      en: "Haddad Brands with style, color, and label 91N781-G52-QO.",
    },
    image_url: "carton/Dubai_carton_short_side",
    updated_at: "2026-03-16 09:11:31.981+00",
  },
  {
    id: 88,
    region_id: 18,
    category_id: 1,
    title: {
      ar: "الجانب القصير 2",
      en: "short side 2",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91N781-G52-QO)، والملصق يحتوي على معلومات عن قطعة الملابس.",
      en: "Haddad Brands with style, color, and label (91N781-G52-QO), and the sticker includes information about the garment.",
    },
    image_url: "carton/Dubai_carton_short_side_2",
    updated_at: "2026-03-16 09:11:02.592+00",
  },
  {
    id: 89,
    region_id: 18,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع وعنوان شحن إلى شركة في دبي.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Dubai.",
    },
    image_url: "carton/Dubai_carton_long_side",
    updated_at: "",
  },
  {
    id: 90,
    region_id: 18,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان دبي.",
      en: "The address of Dubai.",
    },
    image_url: "sticker/Dubai_sticker_Address",
    updated_at: "",
  },
  {
    id: 91,
    region_id: 18,
    category_id: 2,
    title: {
      ar: "ملصق الكرت (RFID)",
      en: "Hangtag sticker (RFID)",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، **.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE & ON THEM.",
    },
    image_url: "sticker/Dubai_sticker_Hangtag_sticker__RFID_",
    updated_at: "2026-01-18 07:13:08.318+00",
  },
  {
    id: 92,
    region_id: 18,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Dubai_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 93,
    region_id: 18,
    category_id: 2,
    title: {
      ar: "ملصق كرتوني",
      en: "Carton Sticker",
    },
    description: {
      ar: "ملصق الشحن الذي يحتوي على معلومات المنتج",
      en: "shipping label containing product information",
    },
    image_url: "sticker/Dubai_sticker_Carton_Sticker",
    updated_at: "",
  },
  {
    id: 94,
    region_id: 18,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Dubai_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 95,
    region_id: 18,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/Dubai_packing_way_individual_bag",
    updated_at: "",
  },
  {
    id: 96,
    region_id: 18,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url: "addition information/Dubai_addition_information_Care_label",
    updated_at: "",
  },
  {
    id: 97,
    region_id: 6,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Israel_carton_Upper_carton",
    updated_at: "2026-03-16 09:22:31.989+00",
  },
  {
    id: 98,
    region_id: 6,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Israel_carton_Down_carton",
    updated_at: "2026-03-16 09:21:25.637+00",
  },
  {
    id: 99,
    region_id: 6,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "علامات حداد مع الأسلوب، اللون، والملصق\r\n 91N781-G52-AL.",
      en: "Haddad Brands with style, color, and label \r\n91N781-G52-AL.",
    },
    image_url: "carton/Israel_carton_short_side",
    updated_at: "",
  },
  {
    id: 100,
    region_id: 6,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع وعنوان شحن إلى شركة في إسرائيل، والملصق يحتوي على معلومات عن قطعة الملابس.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Israel, and the sticker includes information about the garment.",
    },
    image_url: "carton/Israel_carton_Long_side",
    updated_at: "2026-03-16 09:22:04.176+00",
  },
  {
    id: 101,
    region_id: 6,
    category_id: 1,
    title: {
      ar: "الجانب الطويل 2",
      en: "Long side 2",
    },
    description: {
      ar: "علامات حداد مع الأسلوب، اللون، والملصق\r\n 91N781-G52-AL.",
      en: "Haddad Brands with style, color, and label (91N781-G52-AL)",
    },
    image_url: "carton/Israel_carton_Long_side_2",
    updated_at: "",
  },
  {
    id: 102,
    region_id: 6,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، والسعر**.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE & PRICE ON THEM.",
    },
    image_url: "sticker/Israel_sticker_Hangtag_sticker",
    updated_at: "",
  },
  {
    id: 103,
    region_id: 6,
    category_id: 2,
    title: {
      ar: "ملصق كيس ماستر وملصق الكرتون",
      en: "Master polybag sticker and carton",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الموديل، وصف اللون، رمز العبوة، رمز \r\nAL-Code، \r\nUPC.",
      en: "The sticker must include the style name, color description, pack code, AL code, and UPC.",
    },
    image_url: "sticker/Israel_sticker_Master_polybag_sticker_and_carton",
    updated_at: "",
  },
  {
    id: 104,
    region_id: 6,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Israel_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 105,
    region_id: 6,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Israel_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 106,
    region_id: 6,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "Individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في كيس فردي",
      en: "We put every garment in an individual bag",
    },
    image_url: "packing way/Israel_packing_way_Individual_bag",
    updated_at: "",
  },
  {
    id: 107,
    region_id: 6,
    category_id: 3,
    title: {
      ar: "كيس بلاستيكي رئيسي مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع جميع الملابس في كيس بولي ماستر ونضع ملصقًا على كيس البولي الماستر.",
      en: "We place all the clothes in a master polybag and put a sticker on the master polybag.",
    },
    image_url:
      "packing way/Israel_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "",
  },
  {
    id: 108,
    region_id: 6,
    category_id: 3,
    title: {
      ar: "الملابس داخل الصندوق",
      en: "Garment inside Box",
    },
    description: {
      ar: "يجب أن يتناسب الثوب مع حجم الكرتون.",
      en: "The garment must fit inside the carton.",
    },
    image_url: "packing way/Israel_packing_way_Garment_inside_Box",
    updated_at: "",
  },
  {
    id: 109,
    region_id: 6,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url: "addition information/Israel_addition_information_Care_label",
    updated_at: "",
  },
  {
    id: 110,
    region_id: 6,
    category_id: 5,
    title: {
      ar: "ملصق إضافي",
      en: "Additional label",
    },
    description: {
      ar: "معلومات الملصق لـ إسرائيل.",
      en: "Label information for Israel.",
    },
    image_url:
      "addition information/Israel_addition_information_Additional_label",
    updated_at: "",
  },
  {
    id: 111,
    region_id: 4,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Thailand_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 112,
    region_id: 4,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Thailand_carton_Down_carton",
    updated_at: "",
  },
  {
    id: 113,
    region_id: 4,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "علامات حداد مع الأسلوب، اللون، والملصق\r\n 91N781-G52-G0.",
      en: "Haddad Brands with style, color, and label 91N781-G52-G0.",
    },
    image_url: "carton/Thailand_carton_short_side",
    updated_at: "",
  },
  {
    id: 114,
    region_id: 4,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع، وعدد الكراتين والقطع بداخلها، وبلد تجهيز قطعة الملابس، وعنوان الشحن.",
      en: "A long side of the carton is labeled with a tracking number, the count of cartons and pieces inside, the country where the garment was processed, and the shipping address.",
    },
    image_url: "carton/Thailand_carton_Long_side",
    updated_at: "",
  },
  {
    id: 115,
    region_id: 4,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Thailand_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 116,
    region_id: 4,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان تايلاند",
      en: "Thailand Address",
    },
    image_url: "sticker/Thailand_sticker_Address",
    updated_at: "",
  },
  {
    id: 117,
    region_id: 4,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE.",
    },
    image_url: "sticker/Thailand_sticker_Hangtag_sticker",
    updated_at: "",
  },
  {
    id: 118,
    region_id: 4,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Thailand_packing_way_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 119,
    region_id: 4,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/Thailand_packing_way_individual_bag",
    updated_at: "",
  },
  {
    id: 120,
    region_id: 4,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية مع تعليمات متعددة اللغات.",
      en: "Care label with multilingual instructions.",
    },
    image_url: "addition information/Thailand_addition_information_Care_label",
    updated_at: "",
  },
  {
    id: 121,
    region_id: 6,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان إسرائيل.",
      en: "The address of Israel.",
    },
    image_url: "sticker/Israel_sticker_Address",
    updated_at: "",
  },
  {
    id: 122,
    region_id: 3,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Mexico_carton_Upper_carton",
    updated_at: "",
  },
  {
    id: 123,
    region_id: 3,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Mexico_carton_Down_carton",
    updated_at: "",
  },
  {
    id: 124,
    region_id: 3,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91P101-U69-KO)، والملصق يحتوي على معلومات عن قطعة الملابس.",
      en: "Haddad Brands with style, color, and label (91P101-U69-KO), and the sticker includes information about the garment.",
    },
    image_url: "carton/Mexico_carton_short_side",
    updated_at: "2025-11-17 07:23:49.979+00",
  },
  {
    id: 125,
    region_id: 3,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع وعنوان شحن إلى شركة في المكسيك.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Mexico.",
    },
    image_url: "carton/Mexico_carton_long_side",
    updated_at: "",
  },
  {
    id: 126,
    region_id: 3,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Mexico_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 127,
    region_id: 3,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag RFID",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، **.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE.",
    },
    image_url: "sticker/Mexico_sticker_Hangtag_RFID",
    updated_at: "2025-11-17 07:19:25.596+00",
  },
  {
    id: 128,
    region_id: 3,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان المكسيك.",
      en: "The address of Mexico.",
    },
    image_url: "sticker/Mexico_sticker_Address",
    updated_at: "",
  },
  {
    id: 129,
    region_id: 3,
    category_id: 2,
    title: {
      ar: "ملصق كرتوني",
      en: "Carton Sticker",
    },
    description: {
      ar: "يحتوي ملصق الشحن على معلومات المنتج، كما أن رمز \r\nUPC \r\nالموجود على الملصق هو نفسه الموجود على بطاقة التعليق.",
      en: "The shipping label contains product information, and the UPC on the label is the same as the hangtag.",
    },
    image_url: "Mexico_sticker_Carton_Sticker",
    updated_at: "2025-06-10 05:33:08.4+00",
  },
  {
    id: 130,
    region_id: 3,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Mexico_packing_way_Packing_a_T_shirt",
    updated_at: "2025-11-17 07:24:40.626+00",
  },
  {
    id: 131,
    region_id: 3,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/Mexico_packing_way_individual_bag",
    updated_at: "2025-11-17 07:25:04.437+00",
  },
  {
    id: 133,
    region_id: 3,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية يحتوي على تعليمات متعددة اللغات، بالإضافة إلى ملصق عنوان المستورد، ومقاسات خاصة.",
      en: "Care label featuring multilingual instructions, along with the importer's address label, and with special sizing.",
    },
    image_url: "addition information/Mexico_addition_information_Care_label",
    updated_at: "2025-11-17 07:25:34.454+00",
  },
  {
    id: 134,
    region_id: 2,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Panama_carton_Upper_carton",
    updated_at: "2026-03-16 09:07:05.919+00",
  },
  {
    id: 135,
    region_id: 2,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Panama_carton_Down_carton",
    updated_at: "2026-03-16 09:05:42.092+00",
  },
  {
    id: 136,
    region_id: 2,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91N781-G52-AI)، والملصق يحتوي على معلومات عن قطعة الملابس",
      en: "Haddad Brands with style, color, and label (91N781-G52-AI), and the sticker includes information about the garment.",
    },
    image_url: "carton/Panama_carton_short_side",
    updated_at: "2026-03-16 09:06:39.325+00",
  },
  {
    id: 137,
    region_id: 2,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "يتم وضع علامة على الجانب الطويل من الكرتون برقم التتبع وعنوان الشحن لشركة في بنما.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Panama.",
    },
    image_url: "carton/Panama_carton_long_side",
    updated_at: "2026-03-16 09:06:12.158+00",
  },
  {
    id: 138,
    region_id: 2,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Panama_sticker_Haddad_Sticker",
    updated_at: "",
  },
  {
    id: 139,
    region_id: 2,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، **.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE.",
    },
    image_url: "sticker/Panama_sticker_Hangtag_sticker",
    updated_at: "",
  },
  {
    id: 140,
    region_id: 2,
    category_id: 2,
    title: {
      ar: "عنوان و عنوان الكرتون العلوي",
      en: "Address",
    },
    description: {
      ar: "عنوان بنما.",
      en: "The address of Panama.",
    },
    image_url: "Panama_sticker_Address",
    updated_at: "2026-03-09 11:51:08.52+00",
  },
  {
    id: 143,
    region_id: 2,
    category_id: 2,
    title: {
      ar: "ملصق كيس ماستر وملصق الكرتون",
      en: "Master polybag sticker and carton",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الطراز ووصف اللون ونسبة العبوة ورمز المنتج العالمي\r\n (UPC).",
      en: "The sticker must include the style name, color description, pack ratio, and UPC.",
    },
    image_url: "sticker/Panama_sticker_Master_polybag_sticker_and_carton",
    updated_at: "",
  },
  {
    id: 144,
    region_id: 2,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "sticker/Panama_sticker_Packing_a_T_shirt",
    updated_at: "",
  },
  {
    id: 145,
    region_id: 2,
    category_id: 3,
    title: {
      ar: "كيس مجموعه مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع كل مجموعة مكونة من 6 قطع ملابس في كيس ماستر بناءً على النسبة.",
      en: "We put each set of 6 garments in a master polybag based on the ratio.",
    },
    image_url: "Panama_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "2026-03-16 09:08:13.872+00",
  },
  {
    id: 146,
    region_id: 2,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية الذي يحتوي على تعليمات متعددة اللغات، بالإضافة إلى ملصق عنوان المستورد.",
      en: "Care label featuring multilingual instructions, along with the importer's address label.",
    },
    image_url: "Panama_addition_information_Care_label",
    updated_at: "2025-06-03 05:28:26.317+00",
  },
  {
    id: 147,
    region_id: 15,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Canada_sticker_Haddad_Sticker",
    updated_at: "2025-05-31 09:08:17.881+00",
  },
  {
    id: 149,
    region_id: 19,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91N781-G52-X0)، والملصق يحتوي على معلومات عن قطعة الملابس",
      en: "Haddad Brands with style, color, and label (91N781-G52-X0), and the sticker includes information about the garment.",
    },
    image_url: "carton/India_carton_short_side",
    updated_at: "2025-09-10 05:34:17.017+00",
  },
  {
    id: 150,
    region_id: 19,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد، وأبعاد الكرتونة بالسنتيمتر،\r\n وملصق يتضمن حجم الشحنة بالمتر المكعب (CBM)\r\n ورمز التعريفة الجمركية (HTC).",
      en: "The box contains details such as the style number and vendor information, the dimensions of the carton in CM, and a sticker that includes the CBM and HTC code.",
    },
    image_url: "carton/India_carton_Down_carton",
    updated_at: "2025-09-10 05:45:20.324+00",
  },
  {
    id: 151,
    region_id: 19,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع وعنوان شحن إلى شركة في الهند، بالإضافة إلى ملصق يحتوي على رقم أمر الشراء\r\n (PO#).",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in India, and a sticker of PO#.",
    },
    image_url: "carton/India_carton_Long_side",
    updated_at: "2025-09-10 06:18:18.954+00",
  },
  {
    id: 152,
    region_id: 19,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/India_carton_Upper_carton",
    updated_at: "2025-09-10 06:42:11.783+00",
  },
  {
    id: 153,
    region_id: 19,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان الهند.",
      en: "The address of India.",
    },
    image_url: "sticker/India_sticker_Address",
    updated_at: "2025-09-10 06:46:56.31+00",
  },
  {
    id: 154,
    region_id: 19,
    category_id: 2,
    title: {
      ar: "ملصق كرتوني لأسفل",
      en: "Down Carton Sticker",
    },
    description: {
      ar: "يتم وضع الملصق في أسفل الكرتونة،\r\n ويحتوي على حجم الشحنة بالمتر المكعب (CBM)\r\n ورمز التعريفة الجمركية (HTC).",
      en: "The sticker is placed on the bottom of the carton and includes the CBM and HTC code.",
    },
    image_url: "sticker/India_sticker_Down_Carton_Sticker",
    updated_at: "2025-09-10 06:58:47.392+00",
  },
  {
    id: 155,
    region_id: 19,
    category_id: 2,
    title: {
      ar: "ملصق كرتون طويل",
      en: "Long Carton Sticker",
    },
    description: {
      ar: "يتم وضع ملصق على الجانب الطويل من الكرتونة ومكتوب عليه\r\n رقم أمر الشراء (PO).",
      en: "A sticker is placed on the long side of the carton with the PO number written on it.",
    },
    image_url: "sticker/India_sticker_Long_Carton_Sticker",
    updated_at: "2025-09-10 07:02:44.083+00",
  },
  {
    id: 156,
    region_id: 19,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/India_sticker_Haddad_Sticker",
    updated_at: "2025-09-10 07:05:34.535+00",
  },
  {
    id: 157,
    region_id: 19,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/India_packing_way_Packing_a_T_shirt",
    updated_at: "2025-09-10 07:07:03.775+00",
  },
  {
    id: 158,
    region_id: 19,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/India_packing_way_individual_bag",
    updated_at: "2025-09-10 07:08:17.963+00",
  },
  {
    id: 159,
    region_id: 19,
    category_id: 3,
    title: {
      ar: "كيس مجموعة",
      en: "Master polybag",
    },
    description: {
      ar: "نضع جميع قطع الملابس في كيس مجموعة بناءً على النسبة.",
      en: "We put all garments in a master polybag based on the ratio.",
    },
    image_url: "packing way/India_packing_way_Master_polybag",
    updated_at: "2025-09-10 07:12:02.378+00",
  },
  {
    id: 160,
    region_id: 19,
    category_id: 5,
    title: {
      ar: "بطاقة تعليق",
      en: "Hangtag",
    },
    description: {
      ar: "بطاقة تعليق خاصة إلى الهند",
      en: "Special Hangtag to India",
    },
    image_url: "addition information/India_addition_information_Hangtag",
    updated_at: "2025-09-10 07:17:20.062+00",
  },
  {
    id: 161,
    region_id: 19,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية الخاصة إلى الهند",
      en: "Special Care label to India",
    },
    image_url: "addition information/India_addition_information_Care_label",
    updated_at: "2025-09-10 07:20:12.886+00",
  },
  {
    id: 162,
    region_id: 7,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Korea_carton_Upper_carton",
    updated_at: "2025-10-26 06:41:21.233+00",
  },
  {
    id: 163,
    region_id: 7,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Korea_carton_Down_carton",
    updated_at: "2025-10-26 06:42:11.012+00",
  },
  {
    id: 164,
    region_id: 7,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "Front short Side",
    },
    description: {
      ar: "ماركة Haddad \r\nمع الطراز، اللون، والليبل (91M280-C8D-KS)\r\n، والملصق يحتوي على معلومات عن قطعة الملابس.",
      en: "Haddad Brands with style, color, and label (91M280-C8D-KS), and the sticker includes information about the garment.",
    },
    image_url: "carton/Korea_carton_Front_short_Side",
    updated_at: "2025-10-26 06:45:04.656+00",
  },
  {
    id: 165,
    region_id: 7,
    category_id: 1,
    title: {
      ar: "الجانب القصير 2",
      en: "Back short Side",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91N781-G52-MK)،",
      en: "Haddad Brands with style, color, and label (91M280-C8D-KS)",
    },
    image_url: "carton/Korea_carton_Back_short_Side",
    updated_at: "2025-10-26 06:48:18.551+00",
  },
  {
    id: 166,
    region_id: 7,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "جانب طويل من الكرتونة يحمل رقم تتبع وعنوان شحن إلى شركة في كوريا .",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Korea.",
    },
    image_url: "carton/Korea_carton_long_side",
    updated_at: "2025-10-26 06:49:44.158+00",
  },
  {
    id: 167,
    region_id: 7,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Korea_sticker_Haddad_Sticker",
    updated_at: "2025-10-26 06:51:16.041+00",
  },
  {
    id: 168,
    region_id: 7,
    category_id: 2,
    title: {
      ar: "ملصق كرتوني",
      en: "Carton Sticker",
    },
    description: {
      ar: "يقدم الملصق معلومات المنتج، بما في ذلك تفاصيل الكمية والحجم، بالإضافة إلى الميزات الإضافية.",
      en: "The sticker provides product information, including details on quantity and size, as well as additional features.",
    },
    image_url: "sticker/Korea_sticker_Carton_Sticker",
    updated_at: "2025-10-26 06:56:26.126+00",
  },
  {
    id: 169,
    region_id: 7,
    category_id: 2,
    title: {
      ar: "ملصق مقاس",
      en: "Size Sticker",
    },
    description: {
      ar: "يجب تعبئة العنصر بشكل فردي في كيس بلاستيكي مع ملصق مقاس على المقدمة.",
      en: "The item should be packed individually into a polybag with a SIZE STICKER on the front.",
    },
    image_url: "sticker/Korea_sticker_Size_Sticker",
    updated_at: "2025-10-26 07:03:11.994+00",
  },
  {
    id: 170,
    region_id: 7,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب أن تحتوي ملصقات \r\nUPC\r\n العادية الموجودة على علامة العلامة التجارية على رقم الطراز والحجم واللون ورمز \r\nUPC\r\n وشعار كوريا.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE, and Korea Logo.",
    },
    image_url: "sticker/Korea_sticker_Hangtag_sticker",
    updated_at: "2025-10-26 07:06:48.889+00",
  },
  {
    id: 171,
    region_id: 7,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان كوريا.",
      en: "The address of Korea.",
    },
    image_url: "sticker/Korea_sticker_Address",
    updated_at: "2025-10-26 07:11:33.113+00",
  },
  {
    id: 172,
    region_id: 7,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر و بطاقة كوريا على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag and hangtag's Korea to the inner left armhole seam tape.",
    },
    image_url: "packing way/Korea_packing_way_Packing_a_T_shirt",
    updated_at: "2025-10-26 07:14:44.469+00",
  },
  {
    id: 173,
    region_id: 7,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في كيس فردية ونلصق ملصق الحجم على كل كيس.",
      en: "We place each garment in an individual bag and attach a size sticker to each bag.",
    },
    image_url: "packing way/Korea_packing_way_individual_bag",
    updated_at: "2025-10-26 07:17:45.067+00",
  },
  {
    id: 174,
    region_id: 7,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية يحتوي على تعليمات متعددة اللغات، بالإضافة إلى ملصق عنوان المستورد، مع أحجام خاصة وشعار كوريا.",
      en: "Care label featuring multilingual instructions, along with the importer's address label, and with special sizing and the Korea logo.",
    },
    image_url: "addition information/Korea_addition_information_Care_label",
    updated_at: "2025-10-26 07:20:06.657+00",
  },
  {
    id: 175,
    region_id: 7,
    category_id: 5,
    title: {
      ar: "بطاقة تعليق إضافية",
      en: "Hangtag addtional",
    },
    description: {
      ar: "بطاقة تعليق إضافية خاصة إلى كوريا",
      en: "Special Hangtag addition to Korea",
    },
    image_url:
      "addition information/Korea_addition_information_Hangtag_addtional",
    updated_at: "2025-10-26 07:29:11.633+00",
  },
  {
    id: 176,
    region_id: 5,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "ماركة Haddad\r\n مع الطراز، اللون، والليبل \r\n(91N781-G52-XL)،\r\n والملصق يحتوي على معلومات عن قطعة الملابس",
      en: "Haddad Brands with style, color, and label (91N781-G52-XL), and the sticker includes information about the garment.",
    },
    image_url: "carton/Chile_carton_short_side",
    updated_at: "2025-10-26 08:05:10.916+00",
  },
  {
    id: 177,
    region_id: 5,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "يتم وضع علامة على الجانب الطويل من الكرتون برقم التتبع وعنوان الشحن لشركة في تشيلي.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in Chile.",
    },
    image_url: "carton/Chile_carton_Long_side",
    updated_at: "2025-10-26 08:06:32.452+00",
  },
  {
    id: 178,
    region_id: 5,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Chile_carton_Upper_carton",
    updated_at: "2025-10-26 08:09:07.967+00",
  },
  {
    id: 179,
    region_id: 5,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Chile_carton_Down_carton",
    updated_at: "2025-10-26 08:09:55.418+00",
  },
  {
    id: 180,
    region_id: 5,
    category_id: 2,
    title: {
      ar: "ملصق كيس مجموعه وملصق الكرتون",
      en: "Master polybag sticker and carton",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الطراز ووصف اللون ونسبة العبوة ورمز المنتج العالمي (UPC).",
      en: "The sticker must include the style name, color description, pack ratio, and UPC.",
    },
    image_url: "sticker/Chile_sticker_Master_polybag_sticker_and_carton",
    updated_at: "2025-10-26 08:11:29.384+00",
  },
  {
    id: 181,
    region_id: 5,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان تشيلي.",
      en: "The address of Chile.",
    },
    image_url: "sticker/Chile_sticker_Address",
    updated_at: "2025-10-26 08:12:38.271+00",
  },
  {
    id: 182,
    region_id: 5,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Chile_sticker_Haddad_Sticker",
    updated_at: "2025-10-26 08:13:58.495+00",
  },
  {
    id: 183,
    region_id: 5,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، **.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE.",
    },
    image_url: "sticker/Chile_sticker_Hangtag_sticker",
    updated_at: "2025-10-26 08:14:50.532+00",
  },
  {
    id: 184,
    region_id: 5,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Chile_packing_way_Packing_a_T_shirt",
    updated_at: "2025-10-26 08:16:04.979+00",
  },
  {
    id: 185,
    region_id: 5,
    category_id: 3,
    title: {
      ar: "كيس مجموعه مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع كل مجموعة مكونة من 6 قطع ملابس في كيس مجموعه  بناءً على النسبة.",
      en: "We put each set of 6 garments in a master polybag based on the ratio.",
    },
    image_url: "packing way/Chile_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "2025-10-26 08:17:42.223+00",
  },
  {
    id: 186,
    region_id: 5,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية الذي يحتوي على تعليمات متعددة اللغات، بالإضافة إلى ملصق عنوان المستورد.",
      en: "Care label featuring multilingual instructions, along with the importer's address label.",
    },
    image_url: "addition information/Chile_addition_information_Care_label",
    updated_at: "2025-10-26 08:18:43.002+00",
  },
  {
    id: 187,
    region_id: 20,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "ماركة Haddad مع الطراز، اللون، والليبل (91N781-G52-XL)، والملصق يحتوي على معلومات عن قطعة الملابس",
      en: "Haddad Brands with style, color, and label (91N781-G52-XL), and the sticker includes information about the garment.",
    },
    image_url: "carton/Peru_carton_short_side",
    updated_at: "2025-10-26 08:22:16.453+00",
  },
  {
    id: 188,
    region_id: 20,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "يتم وضع علامة على الجانب الطويل من الكرتون برقم التتبع وعنوان الشحن لشركة في بيرو.",
      en: "A long side of the carton is labeled with a tracking number and a shipping address to a company in PERU.",
    },
    image_url: "carton/Peru_carton_Long_side",
    updated_at: "2025-10-26 08:24:11.791+00",
  },
  {
    id: 189,
    region_id: 20,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Peru_carton_Upper_carton",
    updated_at: "2025-10-26 08:25:07.874+00",
  },
  {
    id: 190,
    region_id: 20,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information.",
    },
    image_url: "carton/Peru_carton_Down_carton",
    updated_at: "2025-10-26 08:25:54.193+00",
  },
  {
    id: 191,
    region_id: 20,
    category_id: 2,
    title: {
      ar: "ملصق كيس مجموعه وملصق الكرتون",
      en: "Master polybag sticker and carton",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الطراز ووصف اللون ونسبة العبوة ورمز المنتج العالمي (UPC).",
      en: "The sticker must include the style name, color description, pack ratio, and UPC.",
    },
    image_url: "sticker/Peru_sticker_Master_polybag_sticker_and_carton",
    updated_at: "2025-10-26 08:26:51.581+00",
  },
  {
    id: 192,
    region_id: 20,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "عنوان بيرو.",
      en: "The address of PERU.",
    },
    image_url: "sticker/Peru_sticker_Address",
    updated_at: "2025-10-26 08:27:50.024+00",
  },
  {
    id: 193,
    region_id: 20,
    category_id: 2,
    title: {
      ar: "ملصق حداد",
      en: "Haddad Sticker",
    },
    description: {
      ar: "يجب وضع العناصر في كل من الكراتين العلوية والسفلية.",
      en: "The items must be placed in both the upper and lower cartons.",
    },
    image_url: "sticker/Peru_sticker_Haddad_Sticker",
    updated_at: "2025-10-26 08:28:26.235+00",
  },
  {
    id: 194,
    region_id: 20,
    category_id: 2,
    title: {
      ar: "ملصق الكرت",
      en: "Hangtag sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC، **.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR, UPC CODE.",
    },
    image_url: "sticker/Peru_sticker_Hangtag_sticker",
    updated_at: "2025-10-26 08:29:42.131+00",
  },
  {
    id: 195,
    region_id: 20,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Peru_packing_way_Packing_a_T_shirt",
    updated_at: "2025-10-26 08:30:26.445+00",
  },
  {
    id: 196,
    region_id: 20,
    category_id: 3,
    title: {
      ar: "كيس مجموعه مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع كل مجموعة مكونة من 6 قطع ملابس في كيس مجموعه بناءً على النسبة.",
      en: "We put each set of 6 garments in a master polybag based on the ratio.",
    },
    image_url: "packing way/Peru_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "2025-10-26 08:31:24.498+00",
  },
  {
    id: 197,
    region_id: 20,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق العناية الذي يحتوي على تعليمات متعددة اللغات، بالإضافة إلى ملصق عنوان المستورد.",
      en: "Care label featuring multilingual instructions, along with the importer's address label.",
    },
    image_url: "addition information/Peru_addition_information_Care_label",
    updated_at: "2025-10-26 08:32:10.239+00",
  },
  {
    id: 198,
    region_id: 21,
    category_id: 1,
    title: {
      ar: "الكرتون العلوي",
      en: "Upper carton",
    },
    description: {
      ar: '"Haddad Brands" مع معلومات الشحن وتحذيرات ضد فتحه باستخدام أدوات حادة، يُعرض من الأعلى.',
      en: '"Haddad Brands" with shipping information and warnings against opening it with sharp objects is shown from above.',
    },
    image_url: "carton/Argentina_carton_Upper_carton",
    updated_at: "2025-12-16 08:32:48.48+00",
  },
  {
    id: 199,
    region_id: 21,
    category_id: 1,
    title: {
      ar: "كرتونة سفلية",
      en: "Down carton",
    },
    description: {
      ar: "يحتوي الصندوق على تفاصيل مثل رقم الموديل ومعلومات المورد.",
      en: "The box contains details such as the style number and vendor information",
    },
    image_url: "carton/Argentina_carton_Down_carton",
    updated_at: "2025-12-16 08:33:35.271+00",
  },
  {
    id: 200,
    region_id: 21,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "Long side",
    },
    description: {
      ar: "يحتوي الجانب الطويل من الكرتون على ملصق يتضمن عنوان الشحن، بالإضافة إلى معلومات عن الطراز واللون والملصق.",
      en: "The long side of the carton is labeled with the shipping address, as well as the style, color, and label information.",
    },
    image_url: "carton/Argentina_carton_Long_side",
    updated_at: "2025-12-16 08:35:30.729+00",
  },
  {
    id: 201,
    region_id: 21,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "short side",
    },
    description: {
      ar: "تتميز منتجات هاداد بتصميم أنيق وألوان نابضة بالحياة، ويمكن التعرف عليها من خلال الملصق\r\n 91N781-G52-G0\r\n وملصق RFID.",
      en: "Haddad Brands features a stylish design with vibrant colors, identified by the label 91N781-G52-G0 and an RFID sticker.",
    },
    image_url: "carton/Argentina_carton_short_side",
    updated_at: "2025-12-16 08:37:16.053+00",
  },
  {
    id: 202,
    region_id: 21,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "العنوان الأرجنتين",
      en: "Address Argentina",
    },
    image_url: "sticker/Argentina_sticker_Address",
    updated_at: "2025-12-16 08:38:19.047+00",
  },
  {
    id: 203,
    region_id: 21,
    category_id: 2,
    title: {
      ar: "ملصق الكرت (RFID)",
      en: "Hangtag RFID sticker",
    },
    description: {
      ar: "يجب وضع ملصق **UPC العادي** على بطاقة العلامة التجارية (Hangtag)، ويجب أن يتضمن **رقم النمط، المقاس، وصف اللون كود UPC.",
      en: "REGULAR UPC STICKERS ON THE BRAND HANGTAG MUST HAVE STYLE #, SIZE, COLOR UPC CODE.",
    },
    image_url: "sticker/Argentina_sticker_Hangtag_RFID_sticker",
    updated_at: "2025-12-16 08:40:33.367+00",
  },
  {
    id: 204,
    region_id: 21,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم طبيق التيشيرت ونعلق بطاقة السعر على شريط التماس فتحة الذراع الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtag to the inner left armhole seam tape.",
    },
    image_url: "packing way/Argentina_packing_way_Packing_a_T_shirt",
    updated_at: "2025-12-16 08:41:29.361+00",
  },
  {
    id: 205,
    region_id: 21,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "individual bag",
    },
    description: {
      ar: "نضع كل قطعة ملابس في الكيس الفرداني.",
      en: "We put every garment in the individual bag.",
    },
    image_url: "packing way/Argentina_packing_way_individual_bag",
    updated_at: "2025-12-16 08:42:04.724+00",
  },
  {
    id: 206,
    region_id: 21,
    category_id: 5,
    title: {
      ar: "ملصق العناية",
      en: "Care label",
    },
    description: {
      ar: "ملصق تعليمات العناية متعدد اللغات وملصق إضافي.",
      en: "Care label with multilingual instructions and with an additional label.",
    },
    image_url: "addition information/Argentina_addition_information_Care_label",
    updated_at: "2025-12-16 08:44:06.096+00",
  },
  {
    id: 207,
    region_id: 21,
    category_id: 5,
    title: {
      ar: "الكرت",
      en: "Hangtag",
    },
    description: {
      ar: "نستخدم الكرت م امريكيا",
      en: "We use the hangtag from the U.S. for the styles that we are packaging.",
    },
    image_url: "addition information/Argentina_addition_information_Hangtag",
    updated_at: "2025-12-16 08:46:40.09+00",
  },
  {
    id: 208,
    region_id: 22,
    category_id: 1,
    title: {
      ar: "كرتون علوي وسفلي",
      en: "Upper and Down carton",
    },
    description: {
      ar: "يجب أن تكون الصناديق العلوية والسفلية فارغة دون أي نص.",
      en: "The upper and lower cartons must be blank, with no text.",
    },
    image_url: "carton/Indonesia_carton_Upper_and_Down_carton",
    updated_at: "2025-12-27 08:58:54.733+00",
  },
  {
    id: 209,
    region_id: 22,
    category_id: 1,
    title: {
      ar: "الجانب القصير",
      en: "Short side",
    },
    description: {
      ar: "التفاصيل الخاصة بالستايل، واللون، والليبل، ورقم الكرتونة، وأمر الشراء (PO).",
      en: "The details regarding the style, color, label, carton number, and purchase order (PO).",
    },
    image_url: "carton/Indonesia_carton_Short_side",
    updated_at: "2025-12-27 09:11:33.325+00",
  },
  {
    id: 210,
    region_id: 22,
    category_id: 1,
    title: {
      ar: "الجانب الطويل",
      en: "long side",
    },
    description: {
      ar: "كرتونة فارغة عليها ملصق يوضح عنوان إندونيسيا.",
      en: "A blank carton with a sticker displaying the address for Indonesia.",
    },
    image_url: "carton/Indonesia_carton_long_side",
    updated_at: "2025-12-27 09:13:23.577+00",
  },
  {
    id: 211,
    region_id: 22,
    category_id: 2,
    title: {
      ar: "ملصق بطاقة السعر وملصق بولي فردي.",
      en: "Hangtag sticker and individual poly sticker.",
    },
    description: {
      ar: "الملصق يتضمن الستايل ورمز الـ UPC الخاص بإندونيسيا.",
      en: "The sticker includes the style and UPC of Indonesia",
    },
    image_url:
      "sticker/Indonesia_sticker_Hangtag_sticker_and_individual_poly_sticker_",
    updated_at: "2025-12-27 09:19:27.714+00",
  },
  {
    id: 212,
    region_id: 22,
    category_id: 2,
    title: {
      ar: "ملصق كيس ماستر",
      en: "Master polybag sticker",
    },
    description: {
      ar: "يجب أن يتضمن الملصق اسم الستايل، واللون، والمعلومات ذات الصلة.",
      en: "The sticker should include the style name, color, and relevant information.",
    },
    image_url: "sticker/Indonesia_sticker_Master_polybag_sticker",
    updated_at: "2025-12-27 09:22:12.609+00",
  },
  {
    id: 213,
    region_id: 22,
    category_id: 2,
    title: {
      ar: "عنوان",
      en: "Address",
    },
    description: {
      ar: "تم وضع عنوان إندونيسيا على الجانب الطويل من الكرتونة.",
      en: "The address of Indonesia is put on the long side of the carton.",
    },
    image_url: "sticker/Indonesia_sticker_Address",
    updated_at: "2025-12-27 09:25:25.773+00",
  },
  {
    id: 214,
    region_id: 22,
    category_id: 3,
    title: {
      ar: "تعبئة تي شيرت",
      en: "Packing a T-shirt",
    },
    description: {
      ar: "نقوم بطيّ التيشيرت وتثبيت الهانغ تاج على شريط خياطة فتحة الإبط الداخلية اليسرى.",
      en: "We plate the T-shirt and attach the hangtags to the inner left armhole seam tape.",
    },
    image_url: "packing way/Indonesia_packing_way_Packing_a_T_shirt",
    updated_at: "2025-12-27 09:27:50.796+00",
  },
  {
    id: 215,
    region_id: 22,
    category_id: 3,
    title: {
      ar: "كيس فردية",
      en: "Individual bag With Sticker Poly",
    },
    description: {
      ar: "نضع كل قطعة ملابس في كيس فردي ونضع ملصقًا على الكيس الفردي.",
      en: "We put every garment in an individual bag and place a sticker on the individual bag.",
    },
    image_url:
      "packing way/Indonesia_packing_way_Individual_bag_With_Sticker_Poly",
    updated_at: "2025-12-27 09:29:09.085+00",
  },
  {
    id: 216,
    region_id: 22,
    category_id: 3,
    title: {
      ar: "كيس بلاستيكي رئيسي مع ملصق",
      en: "Master polybag With Sticker Poly",
    },
    description: {
      ar: "نضع جميع الملابس في كيس بولي ماستر ونضع ملصقًا على كيس البولي الماستر.",
      en: "We place all the clothes in a master polybag and put a sticker on the master polybag.",
    },
    image_url:
      "packing way/Indonesia_packing_way_Master_polybag_With_Sticker_Poly",
    updated_at: "2025-12-27 09:30:20.297+00",
  },
  {
    id: 217,
    region_id: 22,
    category_id: 5,
    title: {
      ar: "بطاقة تعليق وبطاقة تعليق إضافية",
      en: "Hangtag & Addtional HangTag",
    },
    description: {
      ar: "الهانغ تاج العلوي أبيض، وتحته الهانغ تاج الرئيسي.",
      en: "The top hang tag is white, with the main hang tag placed underneath.",
    },
    image_url:
      "addition information/Indonesia_addition_information_Hangtag___Addtional_HangTag",
    updated_at: "2025-12-27 09:33:47.885+00",
  },
  {
    id: 218,
    region_id: 22,
    category_id: 5,
    title: {
      ar: "بطاقة تعليق إضافية",
      en: "Additional HangTag",
    },
    description: {
      ar: "بطاقة تعليق إضافية",
      en: "Additional HangTag",
    },
    image_url:
      "addition information/Indonesia_addition_information_Additional_HangTag",
    updated_at: "2025-12-27 09:35:58.065+00",
  },
  {
    id: 219,
    region_id: 22,
    category_id: 5,
    title: {
      ar: "ملصق العناية المخصص",
      en: "Custom care label",
    },
    description: {
      ar: "ملصق العناية المخصص: يجب أن يحتوي ملصق العناية على شعار Levi's.",
      en: "The care label must have the Levi's logo",
    },
    image_url:
      "addition information/Indonesia_addition_information_Custom_care_label",
    updated_at: "2025-12-27 09:38:26.518+00",
  },
] as const;

async function clear() {
  await db.delete(packing);
  await db.delete(categories);
  await db.delete(region);
  await db.delete(country);
  console.log("Cleared tables");
}

async function main() {
  await clear();
  const newCountry = oldDateCountry.map((c) => ({
    slug: slugify(c.country_name.en, { lower: true, trim: true }),
    name_en: c.country_name.en,
    name_ar: c.country_name.ar,
    flag_url: c.flag_url,
  }));

  const newRegion = oldDateCountry.map((c) => ({
    countrySlug: slugify(c.country_name.en, { lower: true, trim: true }),
    slug: slugify(c.account, { lower: true, trim: true }),
    label_name_en: c.label_name,
    label_name_ar: c.label_name,
    account: c.account,
    labels: c.labels.trim().split("-"),
  }));

  const newcategories = OldDateCategories.map((c, index) => ({
    name_en: c.name.en,
    name_ar: c.name.ar,
    sort_order: index + 1,
  }));

  const newPackingway = OldDatePackingWay.map((p) => ({
    category_name: OldDateCategories.find((c) => c.id === p.category_id)!.name
      .en,
    region_slug: slugify(
      oldDateCountry.find((c) => c.id === p.region_id)!.account,
      {
        lower: true,
        trim: true,
      },
    ),
    title_en: p.title.en,
    title_ar: p.title.ar,
    description_en: p.description.en,
    description_ar: p.description.ar,
    image_url: p.image_url,
    created_by_id: "d73VtutxE1nltVvXNLZcRHFjXg2DQScX",
    updated_by_id: null,
    deleted_by_id: null,
  }));

  const countriesInsert = await db
    .insert(country)
    .values(newCountry)
    .returning();

  const regionsInsert = await db
    .insert(region)
    .values(
      newRegion.map((r) => ({
        account: r.account,
        country_id: countriesInsert.find((ct) => ct.slug === r.countrySlug)!.id,
        slug: r.slug,
        label_name_en: r.label_name_en,
        label_name_ar: r.label_name_ar,
        labels: r.labels,
      })),
    )
    .returning();

  const categoriesInsert = await db
    .insert(categories)
    .values(newcategories)
    .returning();

  const PackingInsert = await db
    .insert(packing)
    .values(
      newPackingway.map((pw) => ({
        region_id: regionsInsert.find((re) => re.slug === pw.region_slug)!.id,
        category_id: categoriesInsert.find(
          (ce) => ce.name_en == pw.category_name,
        )!.id,
        title_en: pw.title_en,
        title_ar: pw.title_ar,
        description_en: pw.description_en,
        description_ar: pw.description_ar,
        image_url: pw.image_url,
        created_by_id: pw.created_by_id,
      })),
    )
    .returning();

  console.log(countriesInsert);
  console.log(regionsInsert);
  console.log(categoriesInsert);
  console.log(PackingInsert);
}

main();
