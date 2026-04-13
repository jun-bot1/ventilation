export type Category = "dehumidifier" | "air-purifier";

export type ModelId =
  | "THE6500_150"
  | "THE6500_200"
  | "TAA531"
  | "TAA530"
  | "TAE330"
  | "TAE530";

export type OrderType = "rental" | "purchase";

export type InstallationType = "new-building" | "renovation";

export type PaymentCard = "lotte" | "hana" | "none";

export interface CardDiscountTier {
  minSpend: string;
  discount: string;
  promotion: string;
  total: string;
}

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

export type PyeongId = '36' | '48';
export type ControllerId = 'basic' | 'wide' | 'allinone';
export type MonitorId = 'basic' | 'radon';
export type PriceKey = `${ControllerId}_${MonitorId}`;

export interface PriceOption {
  rental: number;
  purchase: number;
}

export interface SelectOption {
  id: string;
  label: string;
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
  selectedPyeong: PyeongId | null;
  selectedController: ControllerId;
  selectedMonitor: MonitorId;
  orderType: OrderType | null;
  photos: Photos;
  paymentMethod: PaymentCard | null;
  currentStep: number;
}

