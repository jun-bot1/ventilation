import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null): string {
  if (price === null) return "가격 문의";
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

export function formatMonthlyPrice(price: number | null): string {
  if (price === null) return "가격 문의";
  return "월 " + new Intl.NumberFormat("ko-KR").format(price) + "원";
}

export function getPhotoCount(photos: Record<string, File | null>): number {
  return Object.values(photos).filter(Boolean).length;
}
