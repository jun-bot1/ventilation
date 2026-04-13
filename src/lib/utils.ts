import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

export function formatMonthlyPrice(price: number): string {
  return "월 " + new Intl.NumberFormat("ko-KR").format(price) + "원";
}

