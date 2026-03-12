export type Category = "dehumidifier" | "air-purifier";

export type ModelId =
  | "THE6500_150"
  | "THE6500_200"
  | "TAA931"
  | "TAA530"
  | "TAE330"
  | "TAE530";

export type OrderType = "rental" | "purchase";

export type PaymentCard = "lotte" | "hana";

export type PhotoSlot = "leftMachine" | "rightMachine" | "diffuser1" | "diffuser2";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface RentalPrice {
  selfManaged: number;   // 자가관리 월 렌탈료
  visitManaged: number;  // 방문관리 월 렌탈료
  period: number;        // 렌탈 기간 (개월)
}

export interface Product {
  id: ModelId;
  category: Category;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  rentalPrice: RentalPrice;
  purchasePrice: number;
  specs: ProductSpec[];
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  image: string;
  models: ModelId[];
}

export interface PaymentCardInfo {
  id: PaymentCard;
  name: string;
  color: string;
  textColor: string;
  discount: string;
  issuanceLink: string;
}

export interface Photos {
  leftMachine: File | null;
  rightMachine: File | null;
  diffuser1: File | null;
  diffuser2: File | null;
}

export interface ConsultationData {
  selectedCategory: Category | null;
  selectedModel: ModelId | null;
  orderType: OrderType | null;
  photos: Photos;
  paymentMethod: PaymentCard | null;
  currentStep: number;
}

export const PHOTO_SLOT_LABELS: Record<PhotoSlot, { label: string; required: boolean }> = {
  leftMachine: { label: "기존 환기 기계 (왼쪽)", required: true },
  rightMachine: { label: "기존 환기 기계 (오른쪽)", required: true },
  diffuser1: { label: "내부 디퓨저 1", required: false },
  diffuser2: { label: "내부 디퓨저 2", required: false },
};

export const STEP_LABELS = [
  "제품 선택",
  "주문 방식",
  "사진 업로드",
  "결제 방식",
  "확인",
] as const;
