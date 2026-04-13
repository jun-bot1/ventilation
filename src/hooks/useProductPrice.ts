import { useMemo } from 'react';
import { PRODUCTS, PRODUCT_PRICES, CONTROLLER_LABELS, MONITOR_LABELS } from '@/lib/constants';
import { useConsultationStore } from '@/stores/consultation-store';
import type { ModelId, Product } from '@/types';

interface ProductPriceResult {
  product: Product;
  rentalPrice: number;
  purchasePrice: number;
  hasPriceOptions: boolean;
  pyeongId: string;
  controllerId: string;
  monitorId: string;
  isAllinone: boolean;
  pyeongLabel: string;
  controllerLabel: string;
  monitorLabel: string;
  optionsSelected: boolean;
}

export function useProductPrice(modelId: string | null): ProductPriceResult | null {
  const selectedPyeong = useConsultationStore((s) => s.selectedPyeong);
  const selectedController = useConsultationStore((s) => s.selectedController);
  const selectedMonitor = useConsultationStore((s) => s.selectedMonitor);

  const initialProduct = modelId ? PRODUCTS[modelId as ModelId] : undefined;

  const hasPriceOptions = initialProduct ? !!PRODUCT_PRICES[initialProduct.id] : false;
  const pyeongId = selectedPyeong || '36';
  const controllerId = selectedController || 'basic';
  const isAllinone = controllerId === 'allinone';
  const monitorId = isAllinone ? 'basic' : (selectedMonitor || 'basic');
  const priceKey = `${controllerId}_${monitorId}`;

  const prices = (hasPriceOptions && initialProduct)
    ? PRODUCT_PRICES[initialProduct.id]?.[pyeongId]?.[priceKey]
    : null;

  const rentalPrice = prices?.rental ?? initialProduct?.rentalPrice.selfManaged ?? 0;
  const purchasePrice = prices?.purchase ?? initialProduct?.purchasePrice ?? 0;

  const product = useMemo(
    () =>
      prices && initialProduct
        ? {
            ...initialProduct,
            rentalPrice: { ...initialProduct.rentalPrice, selfManaged: rentalPrice },
            purchasePrice,
          }
        : initialProduct,
    [prices, initialProduct, rentalPrice, purchasePrice]
  );

  const pyeongLabel = pyeongId === '48' ? '48평형' : '36평형';
  const controllerLabel = CONTROLLER_LABELS[controllerId] || '베이직';
  const monitorLabel = isAllinone ? '' : (monitorId === 'radon' ? ' · 라돈플러스' : ' · 기본');

  // 필수 선택 여부 체크: 평형, 컨트롤러, 모니터 모두 선택되어야 함
  const optionsSelected = hasPriceOptions
    ? !!(selectedPyeong && selectedController && (isAllinone || selectedMonitor))
    : true;

  if (!product) return null;

  return {
    product,
    rentalPrice,
    purchasePrice,
    hasPriceOptions,
    pyeongId,
    controllerId,
    monitorId,
    isAllinone,
    pyeongLabel,
    controllerLabel,
    monitorLabel,
    optionsSelected,
  };
}
