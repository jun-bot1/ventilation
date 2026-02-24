"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Category, ModelId, OrderType, PaymentCard, Photos } from "@/types";

interface ConsultationState {
  selectedCategory: Category | null;
  selectedModel: ModelId | null;
  orderType: OrderType | null;
  photos: Photos;
  photoPreviews: Record<string, string>;
  paymentMethod: PaymentCard | null;
  currentStep: number;

  // Actions
  setCategory: (category: Category) => void;
  setModel: (model: ModelId) => void;
  setOrderType: (type: OrderType) => void;
  setPhoto: (slot: keyof Photos, file: File | null) => void;
  setPhotoPreview: (slot: string, preview: string) => void;
  setPaymentMethod: (method: PaymentCard) => void;
  setStep: (step: number) => void;
  reset: () => void;

  // Computed
  getPhotoCount: () => number;
  canProceedFromPhotos: () => boolean;
}

const initialState = {
  selectedCategory: null as Category | null,
  selectedModel: null as ModelId | null,
  orderType: null as OrderType | null,
  photos: {
    leftMachine: null,
    rightMachine: null,
    diffuser1: null,
    diffuser2: null,
  } as Photos,
  photoPreviews: {} as Record<string, string>,
  paymentMethod: null as PaymentCard | null,
  currentStep: 0,
};

export const useConsultationStore = create<ConsultationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCategory: (category) => set({ selectedCategory: category, selectedModel: null }),
      setModel: (model) => set({ selectedModel: model }),
      setOrderType: (type) => set({ orderType: type }),
      setPhoto: (slot, file) =>
        set((state) => ({
          photos: { ...state.photos, [slot]: file },
        })),
      setPhotoPreview: (slot, preview) =>
        set((state) => ({
          photoPreviews: { ...state.photoPreviews, [slot]: preview },
        })),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setStep: (step) => set({ currentStep: step }),
      reset: () => set(initialState),

      getPhotoCount: () => {
        const { photos } = get();
        return Object.values(photos).filter(Boolean).length;
      },
      canProceedFromPhotos: () => {
        return get().getPhotoCount() >= 2;
      },
    }),
    {
      name: "navien-consultation",
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return sessionStorage;
      }),
      partialize: (state) => ({
        selectedCategory: state.selectedCategory,
        selectedModel: state.selectedModel,
        orderType: state.orderType,
        paymentMethod: state.paymentMethod,
        currentStep: state.currentStep,
        photoPreviews: state.photoPreviews,
      }),
    }
  )
);
