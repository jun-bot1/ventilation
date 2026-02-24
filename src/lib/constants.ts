import type { CategoryInfo, ModelId, PaymentCardInfo, Product } from "@/types";

export const CATEGORIES: Record<string, CategoryInfo> = {
  dehumidifier: {
    id: "dehumidifier",
    name: "제습 환기청정기",
    description: "습도 조절과 환기를 한번에",
    image: "/images/products/dehumidifier-THE6500.webp",
    models: ["THE6500"],
  },
  "air-purifier": {
    id: "air-purifier",
    name: "환기청정기",
    description: "깨끗한 공기를 우리 집으로",
    image: "/images/products/air-purifier-TAA931.webp",
    models: ["TAA931", "TAA530", "TAE331", "TAE530"],
  },
};

export const PRODUCTS: Record<ModelId, Product> = {
  THE6500: {
    id: "THE6500",
    category: "dehumidifier",
    name: "나비엔 제습환기 THE6500",
    subtitle: "제습 + 환기 + 청정 올인원",
    description: "제습과 환기를 동시에 해결하는 프리미엄 제습환기청정기입니다. 쾌적한 실내 습도를 유지하면서 신선한 외부 공기를 공급합니다.",
    image: "/images/products/dehumidifier-THE6500.webp",
    rentalPrice: null,
    purchasePrice: null,
    specs: [
      { label: "모델명", value: "THE6500" },
      { label: "타입", value: "제습환기청정기" },
      { label: "설치 방식", value: "벽걸이/천장형" },
    ],
  },
  TAA931: {
    id: "TAA931",
    category: "air-purifier",
    name: "나비엔 환기청정 TAA931",
    subtitle: "대용량 환기청정",
    description: "넓은 공간에 적합한 대용량 환기청정기입니다. 강력한 공기 정화 성능으로 깨끗한 실내 환경을 만들어줍니다.",
    image: "/images/products/air-purifier-TAA931.webp",
    rentalPrice: null,
    purchasePrice: null,
    specs: [
      { label: "모델명", value: "TAA931" },
      { label: "타입", value: "환기청정기" },
      { label: "설치 방식", value: "벽걸이/천장형" },
    ],
  },
  TAA530: {
    id: "TAA530",
    category: "air-purifier",
    name: "나비엔 환기청정 TAA530",
    subtitle: "컴팩트 환기청정",
    description: "컴팩트한 사이즈로 다양한 공간에 설치 가능한 환기청정기입니다.",
    image: "/images/products/air-purifier-TAA530.webp",
    rentalPrice: null,
    purchasePrice: null,
    specs: [
      { label: "모델명", value: "TAA530" },
      { label: "타입", value: "환기청정기" },
      { label: "설치 방식", value: "벽걸이/천장형" },
    ],
  },
  TAE331: {
    id: "TAE331",
    category: "air-purifier",
    name: "나비엔 환기청정 TAE331",
    subtitle: "에너지 절약형 환기청정",
    description: "에너지 효율이 높은 환기청정기로 경제적인 운영이 가능합니다.",
    image: "/images/products/air-purifier-TAE331.webp",
    rentalPrice: null,
    purchasePrice: null,
    specs: [
      { label: "모델명", value: "TAE331" },
      { label: "타입", value: "환기청정기" },
      { label: "설치 방식", value: "벽걸이/천장형" },
    ],
  },
  TAE530: {
    id: "TAE530",
    category: "air-purifier",
    name: "나비엔 환기청정 TAE530",
    subtitle: "고성능 환기청정",
    description: "고성능 필터와 강력한 환기 시스템으로 최상의 공기질을 제공합니다.",
    image: "/images/products/air-purifier-TAE530.webp",
    rentalPrice: null,
    purchasePrice: null,
    specs: [
      { label: "모델명", value: "TAE530" },
      { label: "타입", value: "환기청정기" },
      { label: "설치 방식", value: "벽걸이/천장형" },
    ],
  },
};

export const PAYMENT_CARDS: Record<string, PaymentCardInfo> = {
  lotte: {
    id: "lotte",
    name: "롯데카드",
    color: "#ED1C24",
    textColor: "#FFFFFF",
    discount: "제휴 할인 혜택 제공",
    issuanceLink: "#",
  },
  hana: {
    id: "hana",
    name: "하나카드",
    color: "#009490",
    textColor: "#FFFFFF",
    discount: "제휴 할인 혜택 제공",
    issuanceLink: "#",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
export const PRODUCT_LIST = Object.values(PRODUCTS);
