import type { CardDiscountTier, Category, CategoryInfo, ModelId, PaymentCard, PaymentCardInfo, PhotoSlot, Product, PyeongId, PriceOption, SelectOption } from "@/types";

// ─── Photo Slots ──────────────────────────────────────────────────────────────
export const PHOTO_SLOTS: PhotoSlot[] = ['leftMachine', 'rightMachine', 'diffuser1', 'diffuser2'];

export const PHOTO_SLOT_LABELS: Record<PhotoSlot, { label: string; required: boolean }> = {
  leftMachine: { label: "기존 환기 기계 (왼쪽)", required: true },
  rightMachine: { label: "기존 환기 기계 (오른쪽)", required: true },
  diffuser1: { label: "내부 디퓨저 1", required: false },
  diffuser2: { label: "내부 디퓨저 2", required: false },
};

// ─── Step Labels ──────────────────────────────────────────────────────────────
export const STEP_LABELS = [
  "제품 선택",
  "주문 방식",
  "사진 업로드",
  "결제 방식",
  "고객 정보",
  "확인",
] as const;

// ─── Product Categories ───────────────────────────────────────────────────────
export const CATEGORIES: Record<Category, CategoryInfo> = {
  dehumidifier: {
    id: "dehumidifier",
    name: "제습환기청정기",
    description: "습도 조절과 환기를 한번에",
    image: "/images/products/dehumidifier-THE6500.png",
    models: ["THE6500_150", "THE6500_200"],
  },
  "air-purifier": {
    id: "air-purifier",
    name: "환기청정기",
    description: "깨끗한 공기를 우리 집으로",
    image: "/images/products/air-purifier-TAA931.png",
    models: ["TAA531", "TAA530", "TAE530", "TAE330"],
  },
};

// ─── Product Models ───────────────────────────────────────────────────────────
export const PRODUCTS: Record<ModelId, Product> = {
  THE6500_150: {
    id: "THE6500_150",
    category: "dehumidifier",
    name: "나비엔 제습환기 THE650 (150/200)",
    subtitle: "제습 + 환기 + 청정 올인원 · 36~48평형",
    description: "제습과 환기를 동시에 해결하는 프리미엄 제습환기청정기입니다. 150CMH 풍량으로 36~48평형까지 쾌적한 실내 습도를 유지하면서 신선한 외부 공기를 공급합니다.",
    image: "/images/products/dehumidifier-THE6500.png",
    rentalPrice: {
      selfManaged: 56400,
      visitManaged: 61400,
      period: 48,
    },
    purchasePrice: 2900000,
    specs: [
      { label: "모델명", value: "THE650-0150S" },
      { label: "타입", value: "제습환기청정기" },
      { label: "풍량", value: "150CMH" },
      { label: "적용면적", value: "36~48평형" },
      { label: "소비전력", value: "46W" },
      { label: "제습능력", value: "6.5L/일" },
      { label: "필터", value: "전열교환소자, 헤파필터, 탈취필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
  THE6500_200: {
    id: "THE6500_200",
    category: "dehumidifier",
    name: "나비엔 제습환기 매직플러스 THE650 (150/200)",
    subtitle: "제습 + 환기 + 청정 올인원 · 36~48평형",
    description: "제습과 환기를 동시에 해결하는 프리미엄 제습환기청정기입니다. 200CMH 대용량 풍량으로 36~48평형까지 넓은 공간의 쾌적한 실내 환경을 제공합니다.",
    image: "/images/products/THE650+masic.png",
    rentalPrice: {
      selfManaged: 76300,
      visitManaged: 81300,
      period: 48,
    },
    purchasePrice: 3950000,
    specs: [
      { label: "모델명", value: "THE650-0200S" },
      { label: "타입", value: "제습환기청정기" },
      { label: "풍량", value: "200CMH" },
      { label: "적용면적", value: "36~48평형" },
      { label: "소비전력", value: "56W" },
      { label: "제습능력", value: "8.0L/일" },
      { label: "필터", value: "전열교환소자, 헤파필터, 탈취필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
  TAA531: {
    id: "TAA531",
    category: "air-purifier",
    name: "나비엔 환기청정 TAA531/TAA530",
    subtitle: "컴팩트 환기청정 · 36~48평형",
    description: "넓은 공간에 적합한 대용량 환기청정기입니다. 강력한 공기 정화 성능으로 깨끗한 실내 환경을 만들어줍니다.",
    image: "/images/products/air-purifier-TAA931.png",
    rentalPrice: {
      selfManaged: 28900,
      visitManaged: 33900,
      period: 48,
    },
    purchasePrice: 2110000,
    specs: [
      { label: "모델명", value: "TAA531/TAA530" },
      { label: "타입", value: "환기청정기" },
      { label: "적용면적", value: "36~48평형" },
      { label: "소비전력", value: "45W" },
      { label: "필터", value: "전열교환소자, 헤파필터, 탈취필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
  TAA530: {
    id: "TAA530",
    category: "air-purifier",
    name: "환기청정기 매직플러스 TAA531/TAA530",
    subtitle: "매직플러스 : 환기청정 + 3D에어후드 · 36~48평형",
    description: "매직플러스 : 환기청정 + 3D에어후드",
    image: "/images/products/TAA530+magic.png",
    rentalPrice: {
      selfManaged: 50800,
      visitManaged: 55800,
      period: 48,
    },
    purchasePrice: 3080000,
    specs: [
      { label: "모델명", value: "TAA530" },
      { label: "타입", value: "환기청정기" },
      { label: "풍량", value: "100CMH" },
      { label: "소비전력", value: "36W" },
      { label: "필터", value: "전열교환소자, 헤파필터, 탈취필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
  TAE530: {
    id: "TAE530",
    category: "air-purifier",
    name: "환기청정기 매직플러스 TAE530",
    subtitle: "매직플러스 : 환기청정 + 3D에어후드 · 60~72평형",
    description: "고성능 필터와 강력한 환기 시스템으로 최상의 공기질을 제공합니다.",
    image: "/images/products/TAE530+magic.png",
    rentalPrice: {
      selfManaged: 55800,
      visitManaged: 60800,
      period: 48,
    },
    purchasePrice: 2480000,
    specs: [
      { label: "모델명", value: "TAE530" },
      { label: "타입", value: "환기청정기" },
      { label: "풍량", value: "100CMH" },
      { label: "소비전력", value: "33W" },
      { label: "필터", value: "전열교환소자, 헤파필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
  TAE330: {
    id: "TAE330",
    category: "air-purifier",
    name: "나비엔 환기청정 TAE530",
    subtitle: "대용량 환기청정기 · 60~72평형",
    description: "에너지 효율이 높은 환기청정기로 경제적인 운영이 가능합니다.",
    image: "/images/products/air-purifier-TAE330.png",
    rentalPrice: {
      selfManaged: 33900,
      visitManaged: 38900,
      period: 48,
    },
    purchasePrice: 2430000,
    specs: [
      { label: "모델명", value: "TAE330" },
      { label: "타입", value: "환기청정기" },
      { label: "풍량", value: "70CMH" },
      { label: "소비전력", value: "26W" },
      { label: "필터", value: "전열교환소자, 헤파필터" },
      { label: "설치비", value: "기본설치비 포함" },
      { label: "렌탈기간", value: "48개월" },
    ],
  },
};

// ─── Payment Cards ────────────────────────────────────────────────────────────
export const PAYMENT_CARDS: Record<PaymentCard, PaymentCardInfo> = {
  lotte: {
    id: "lotte",
    name: "롯데카드",
    color: "#ED1C24",
    textColor: "#FFFFFF",
    discount: "전월 실적에 따라 최대 25,000원 할인",
    issuanceLink: "https://www.lottecard.co.kr/app/LPCDADB_V100.lc?vtCdKndC=P13791-A13791",
  },
  hana: {
    id: "hana",
    name: "하나카드",
    color: "#009490",
    textColor: "#FFFFFF",
    discount: "전월 실적 30만원 이상 시 13,000원 할인",
    issuanceLink: "https://www.hanacard.co.kr/",
  },
  none: {
    id: "none",
    name: "제휴카드 사용안함",
    color: "#9CA3AF",
    textColor: "#FFFFFF",
    discount: "할인 혜택 없이 진행합니다",
    issuanceLink: "",
  },
};

export const CARD_DISCOUNT_TIERS: Record<string, CardDiscountTier[]> = {
  lotte: [
    { minSpend: "30만원 이상", discount: "10,000원", promotion: "3,000원", total: "13,000원" },
    { minSpend: "70만원 이상", discount: "15,000원", promotion: "-", total: "15,000원" },
    { minSpend: "150만원 이상", discount: "25,000원", promotion: "-", total: "25,000원" },
  ],
  hana: [
    { minSpend: "30만원 이상", discount: "13,000원", promotion: "-", total: "13,000원" },
  ],
};

// ─── Derived Lists ────────────────────────────────────────────────────────────
export const CATEGORY_LIST = Object.values(CATEGORIES);
export const PRODUCT_LIST = Object.values(PRODUCTS);

// ─── Option Constants ────────────────────────────────────────────────────────
export const PYEONG_OPTIONS: SelectOption[] = [
  { id: '36', label: '36평형' },
  { id: '48', label: '48평형' },
];

export const CONTROLLER_OPTIONS: SelectOption[] = [
  { id: 'basic', label: '베이직(3인치)' },
  { id: 'wide', label: '와이드(4인치)' },
  { id: 'allinone', label: '올인원(4인치)' },
];

// 제습환기는 와이드 컨트롤러 단일
export const DEHUMIDIFIER_CONTROLLER_OPTIONS: SelectOption[] = [
  { id: 'wide', label: '와이드(4인치)' },
];

export const AIR_MONITOR_OPTIONS: SelectOption[] = [
  { id: 'basic', label: '기본' },
  { id: 'radon', label: '라돈플러스' },
];

// ─── Product Prices ───────────────────────────────────────────────────────────
// Keys: Record<ModelId, Record<PyeongId, Record<PriceKey, PriceOption>>>
export const PRODUCT_PRICES: Record<string, Record<string, Record<string, PriceOption>>> = {
  THE6500_150: {
    '36': { basic_basic: { rental: 56400, purchase: 2850000 }, basic_radon: { rental: 57400, purchase: 3050000 }, wide_basic: { rental: 56400, purchase: 2850000 }, wide_radon: { rental: 57400, purchase: 3050000 }, allinone_basic: { rental: 56400, purchase: 2850000 } },
    '48': { basic_basic: { rental: 56900, purchase: 2900000 }, basic_radon: { rental: 57900, purchase: 3100000 }, wide_basic: { rental: 56900, purchase: 2900000 }, wide_radon: { rental: 57900, purchase: 3100000 }, allinone_basic: { rental: 56900, purchase: 2900000 } },
  },
  THE6500_200: {
    '36': { basic_basic: { rental: 78300, purchase: 3940000 }, basic_radon: { rental: 79300, purchase: 4140000 }, wide_basic: { rental: 78300, purchase: 3940000 }, wide_radon: { rental: 79300, purchase: 4140000 }, allinone_basic: { rental: 78300, purchase: 3940000 } },
    '48': { basic_basic: { rental: 78800, purchase: 3980000 }, basic_radon: { rental: 79800, purchase: 4180000 }, wide_basic: { rental: 78800, purchase: 3980000 }, wide_radon: { rental: 79800, purchase: 4180000 }, allinone_basic: { rental: 78800, purchase: 3980000 } },
  },
  TAA531: {
    '36': {
      basic_basic: { rental: 36900, purchase: 2110000 }, basic_radon: { rental: 37900, purchase: 2310000 },
      wide_basic: { rental: 37900, purchase: 2110000 }, wide_radon: { rental: 38900, purchase: 2310000 },
      allinone_basic: { rental: 28900, purchase: 2110000 },
    },
    '48': {
      basic_basic: { rental: 37900, purchase: 2160000 }, basic_radon: { rental: 38900, purchase: 2360000 },
      wide_basic: { rental: 38900, purchase: 2160000 }, wide_radon: { rental: 39900, purchase: 2360000 },
      allinone_basic: { rental: 29900, purchase: 2160000 },
    },
  },
  TAA530: {
    '36': { basic_basic: { rental: 50800, purchase: 3080000 }, basic_radon: { rental: 51800, purchase: 3280000 }, wide_basic: { rental: 50800, purchase: 3080000 }, wide_radon: { rental: 51800, purchase: 3280000 }, allinone_basic: { rental: 50800, purchase: 3080000 } },
    '48': { basic_basic: { rental: 51300, purchase: 3130000 }, basic_radon: { rental: 52300, purchase: 3330000 }, wide_basic: { rental: 51300, purchase: 3130000 }, wide_radon: { rental: 52300, purchase: 3330000 }, allinone_basic: { rental: 51300, purchase: 3130000 } },
  },
  TAE330: {
    '36': { basic_basic: { rental: 33900, purchase: 2430000 }, basic_radon: { rental: 34900, purchase: 2630000 }, wide_basic: { rental: 33900, purchase: 2430000 }, wide_radon: { rental: 34900, purchase: 2630000 }, allinone_basic: { rental: 33900, purchase: 2430000 } },
    '48': { basic_basic: { rental: 34400, purchase: 2480000 }, basic_radon: { rental: 35400, purchase: 2680000 }, wide_basic: { rental: 34400, purchase: 2480000 }, wide_radon: { rental: 35400, purchase: 2680000 }, allinone_basic: { rental: 34400, purchase: 2480000 } },
  },
  TAE530: {
    '36': { basic_basic: { rental: 55800, purchase: 2480000 }, basic_radon: { rental: 56800, purchase: 2680000 }, wide_basic: { rental: 55800, purchase: 2480000 }, wide_radon: { rental: 56800, purchase: 2680000 }, allinone_basic: { rental: 55800, purchase: 2480000 } },
    '48': { basic_basic: { rental: 56300, purchase: 2530000 }, basic_radon: { rental: 57300, purchase: 2730000 }, wide_basic: { rental: 56300, purchase: 2530000 }, wide_radon: { rental: 57300, purchase: 2730000 }, allinone_basic: { rental: 56300, purchase: 2530000 } },
  },
};

export const CONTROLLER_LABELS: Record<string, string> = {
  basic: '베이직',
  wide: '와이드',
  allinone: '올인원',
};

export const MONITOR_LABELS: Record<string, string> = {
  basic: '기본',
  radon: '라돈플러스',
};

// ─── Product Detail Images (from navienhouse.com CDN) ────────────────────────
const T = 'https://static.navienhouse.com/data/navienhouse/backup/nextprod/cdn/images/ko/product/the650/mobile';
const V = 'https://static.navienhouse.com/data/navienhouse/backup/nextprod/cdn/images/ko/product/2023product';
const VC = 'https://static.navienhouse.com/data/navienhouse/backup/nextprod/cdn/images/ko/product/ventilation_common';

export const PRODUCT_DETAIL_IMAGES: Record<string, string[]> = {
  THE6500_150: [
    '/images/THE650/1.jpg',
    '/images/THE650/2.jpg',
    '/images/THE650/3.jpg',
    '/images/THE650/4.jpg',
    '/images/THE650/5.jpg',
    '/images/THE650/6.jpg',
  ],
  THE6500_200: [
    '/images/THE650/1.jpg',
    '/images/THE650/2.jpg',
    '/images/THE650/3.jpg',
    '/images/THE650/4.jpg',
    '/images/THE650/5.jpg',
    '/images/THE650/6.jpg',
  ],
  TAA531: [
    '/images/TAA530/1.png',
  ],
  TAA530: [
    '/images/TAA530/TAA531-Masic.png',
  ],
  TAE530: [
    '/images/TAE530/TAE530-Masic.png',
  ],
  TAE330: [
    '/images/TAE530/TAE530.png',
  ],
};
