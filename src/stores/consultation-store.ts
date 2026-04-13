"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Category, ControllerId, InstallationType, ModelId, MonitorId, OrderType, PaymentCard, Photos, PyeongId } from "@/types";

interface ConsultationState {
  selectedCategory: Category | null;
  selectedModel: ModelId | null;
  orderType: OrderType | null;
  installationType: InstallationType;
  photos: Photos;
  photoPreviews: Record<string, string>;
  selectedPyeong: PyeongId | null;
  selectedController: ControllerId | null;
  selectedMonitor: MonitorId | null;
  paymentMethod: PaymentCard | null;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerAddressDetail: string;
  currentStep: number;

  // Actions
  setCategory: (category: Category) => void;
  setModel: (model: ModelId) => void;
  setPyeong: (pyeong: PyeongId) => void;
  setController: (controller: ControllerId) => void;
  setMonitor: (monitor: MonitorId) => void;
  setOrderType: (type: OrderType) => void;
  setInstallationType: (type: InstallationType) => void;
  setPhoto: (slot: keyof Photos, file: File | null) => void;
  setPhotoPreview: (slot: string, preview: string) => void;
  setPaymentMethod: (method: PaymentCard) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setCustomerAddress: (address: string) => void;
  setCustomerAddressDetail: (detail: string) => void;
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
  installationType: 'renovation' as InstallationType,
  photos: {
    leftMachine: null,
    rightMachine: null,
    diffuser1: null,
    diffuser2: null,
  } as Photos,
  photoPreviews: {} as Record<string, string>,
  selectedPyeong: null as PyeongId | null,
  selectedController: null as ControllerId | null,
  selectedMonitor: null as MonitorId | null,
  paymentMethod: null as PaymentCard | null,
  customerName: '',
  customerPhone: '',
  customerAddress: '',
  customerAddressDetail: '',
  currentStep: 0,
};

export const useConsultationStore = create<ConsultationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCategory: (category) => set({ selectedCategory: category, selectedModel: null }),
      setModel: (model) => set({ selectedModel: model }),
      setPyeong: (pyeong) => set({ selectedPyeong: pyeong }),
      setController: (controller) => set({ selectedController: controller }),
      setMonitor: (monitor) => set({ selectedMonitor: monitor }),
      setOrderType: (type) => set({ orderType: type }),
      setInstallationType: (type) => set({ installationType: type }),
      setPhoto: (slot, file) =>
        set((state) => ({
          photos: { ...state.photos, [slot]: file },
        })),
      setPhotoPreview: (slot, preview) =>
        set((state) => {
          const next = { ...state.photoPreviews };
          if (!preview) delete next[slot];
          else next[slot] = preview;
          return { photoPreviews: next };
        }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setCustomerName: (name) => set({ customerName: name }),
      setCustomerPhone: (phone) => set({ customerPhone: phone }),
      setCustomerAddress: (address) => set({ customerAddress: address }),
      setCustomerAddressDetail: (detail) => set({ customerAddressDetail: detail }),
      setStep: (step) => set({ currentStep: step }),
      reset: () => set(initialState),

      getPhotoCount: () => {
        const { photos } = get();
        return Object.values(photos).filter(Boolean).length;
      },
      canProceedFromPhotos: () => {
        if (get().installationType === 'new-building') return true;
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
        selectedPyeong: state.selectedPyeong,
        selectedController: state.selectedController,
        selectedMonitor: state.selectedMonitor,
        orderType: state.orderType,
        installationType: state.installationType,
        paymentMethod: state.paymentMethod,
        customerName: state.customerName,
        customerPhone: state.customerPhone,
        customerAddress: state.customerAddress,
        customerAddressDetail: state.customerAddressDetail,
        currentStep: state.currentStep,
        photoPreviews: state.photoPreviews,
      }),
    }
  )
);
