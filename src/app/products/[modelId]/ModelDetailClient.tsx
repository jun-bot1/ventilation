'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ModelDetail from '@/components/product/ModelDetail';
import PriceTable from '@/components/product/PriceTable';
import OptionSelector from '@/components/product/OptionSelector';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';
import { PRODUCTS, PYEONG_OPTIONS, CONTROLLER_OPTIONS, DEHUMIDIFIER_CONTROLLER_OPTIONS, AIR_MONITOR_OPTIONS } from '@/lib/constants';
import { useProductPrice } from '@/hooks/useProductPrice';
import { useConsultationStore } from '@/stores/consultation-store';
import type { ControllerId, ModelId, MonitorId, PyeongId } from '@/types';

export default function ModelDetailClient() {
  const params = useParams();
  const router = useRouter();
  const setModel = useConsultationStore((s) => s.setModel);
  const setPyeong = useConsultationStore((s) => s.setPyeong);
  const setControllerStore = useConsultationStore((s) => s.setController);
  const setMonitorStore = useConsultationStore((s) => s.setMonitor);

  const modelId = params.modelId as string;
  const result = useProductPrice(modelId);

  useEffect(() => {
    if (!result) router.replace('/products');
  }, [result, router]);

  if (!result) return null;

  const {
    product,
    hasPriceOptions,
    pyeongId,
    controllerId,
    monitorId,
    isAllinone,
    optionsSelected,
  } = result;

  const selectedPyeong = useConsultationStore((s) => s.selectedPyeong);
  const selectedController = useConsultationStore((s) => s.selectedController);
  const selectedMonitor = useConsultationStore((s) => s.selectedMonitor);

  const isDehumidifier = product.category === 'dehumidifier';
  const controllerOptions = isDehumidifier ? DEHUMIDIFIER_CONTROLLER_OPTIONS : CONTROLLER_OPTIONS;

  // 페이지 진입 시 첫 번째 옵션 자동 선택
  useEffect(() => {
    if (!hasPriceOptions) return;
    if (!selectedPyeong) setPyeong(PYEONG_OPTIONS[0].id as PyeongId);
    if (isDehumidifier) {
      setControllerStore('wide' as ControllerId);
    } else if (!selectedController) {
      setControllerStore(controllerOptions[0].id as ControllerId);
    }
    if (!selectedMonitor) setMonitorStore(AIR_MONITOR_OPTIONS[0].id as MonitorId);
  }, [hasPriceOptions, selectedPyeong, selectedController, selectedMonitor, setPyeong, setControllerStore, setMonitorStore, controllerOptions, isDehumidifier]);

  const setSelectedPyeong = (pyeong: string) => setPyeong(pyeong as PyeongId);
  const setSelectedController = (controller: string) => {
    setControllerStore(controller as ControllerId);
    if (controller === 'allinone') setMonitorStore('basic' as MonitorId);
  };
  const setSelectedMonitor = (monitor: string) => setMonitorStore(monitor as MonitorId);

  const handleConsult = () => {
    setModel(product.id);
    router.push('/order');
  };

  const backHref = `/products/${product.category}`;

  return (
    <div className="min-h-dvh bg-white pb-32">
      {/* 헤더 */}
      <div className="px-5 pt-4 pb-2 flex items-center gap-2">
        <BackButton href={backHref} />
        <span className="text-sm text-gray-500 font-medium">{product.id}</span>
      </div>

      {/* 모델 상세 */}
      <div className="mt-2">
        <ModelDetail product={product} />
      </div>

      {/* 평형 선택 */}
      {hasPriceOptions && (
        <OptionSelector
          title="평형 선택"
          options={PYEONG_OPTIONS}
          selected={selectedPyeong}
          onSelect={setSelectedPyeong}
          delay={0.05}
          required
        />
      )}

      {/* 에어 룸컨트롤러 */}
      {hasPriceOptions && isDehumidifier && (
        <div className="px-5 mt-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">에어 룸컨트롤러</p>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-50 border-2 border-primary-500">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="#3182F6"/>
              <path d="M5.5 9L8 11.5L12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-semibold text-primary-600">와이드(4인치)</span>
          </div>
        </div>
      )}
      {hasPriceOptions && !isDehumidifier && (
        <OptionSelector
          title="에어 룸컨트롤러"
          options={controllerOptions}
          selected={selectedController}
          onSelect={setSelectedController}
          delay={0.08}
          required
        />
      )}

      {/* 에어모니터 (올인원이 아닐 때만) */}
      {hasPriceOptions && !isAllinone && (
        <OptionSelector
          title="에어모니터"
          options={AIR_MONITOR_OPTIONS}
          selected={selectedMonitor}
          onSelect={setSelectedMonitor}
          delay={0.1}
          required
        />
      )}

      {/* 가격 테이블 */}
      <PriceTable product={product} />

      {/* 하단 CTA - fixed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-5 pb-6 pt-3 bg-white border-t border-gray-100 shadow-[0_-1px_3px_rgba(0,0,0,0.06)]"
      >
        <Button fullWidth onClick={handleConsult} disabled={!optionsSelected}>
          이 제품으로 상담하기
        </Button>
      </motion.div>
    </div>
  );
}
