'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useConsultationStore } from '@/stores/consultation-store';
import OrderPageLayout from '@/components/order/OrderPageLayout';

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: { address: string; zonecode: string }) => void;
      }) => { open: () => void };
    };
  }
}

export default function CustomerInfoPage() {
  const router = useRouter();
  const {
    orderType,
    customerName,
    customerPhone,
    customerAddress,
    customerAddressDetail,
    setCustomerName,
    setCustomerPhone,
    setCustomerAddress,
    setCustomerAddressDetail,
    setStep,
  } = useConsultationStore();

  // 카카오 주소 API 스크립트 로드
  useEffect(() => {
    if (document.getElementById('daum-postcode-script')) return;
    const script = document.createElement('script');
    script.id = 'daum-postcode-script';
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!orderType) {
      router.replace('/order');
    }
  }, [orderType, router]);

  const handleAddressSearch = useCallback(() => {
    if (!window.daum) return;
    new window.daum.Postcode({
      oncomplete: (data) => {
        setCustomerAddress(data.address);
      },
    }).open();
  }, [setCustomerAddress]);

  const handlePhoneChange = (value: string) => {
    // 숫자만 허용, 하이픈 자동 추가
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
    let formatted = numbers;
    if (numbers.length > 3 && numbers.length <= 7) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length > 7) {
      formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    }
    setCustomerPhone(formatted);
  };

  const isValid =
    customerName.trim().length >= 2 &&
    customerPhone.replace(/-/g, '').length >= 10 &&
    customerAddress.trim().length > 0 &&
    customerAddressDetail.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    setStep(5);
    router.push('/order/review');
  };

  if (!orderType) return null;

  return (
    <OrderPageLayout
      title="고객 정보"
      step={4}
      onNext={handleNext}
      ctaDisabled={!isValid}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          고객 정보를 입력해 주세요
        </h2>
        <p className="text-sm text-gray-500">
          정확한 상담을 위해 설치 장소와 연락처를 알려주세요.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* 성함 */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            성함 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="홍길동"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
          />
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="010-1234-5678"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
          />
        </div>

        {/* 주소 */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            설치 주소 <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={handleAddressSearch}
            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-left text-base transition-colors hover:border-gray-300 focus:border-primary-500 focus:outline-none"
          >
            {customerAddress ? (
              <span className="text-gray-900">{customerAddress}</span>
            ) : (
              <span className="text-gray-400">주소 검색하기</span>
            )}
          </button>
        </div>

        {/* 상세 주소 */}
        {customerAddress && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              상세 주소 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerAddressDetail}
              onChange={(e) => setCustomerAddressDetail(e.target.value)}
              placeholder="동/호수 입력"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-semibold text-gray-700">개인정보 안내</span><br />
          입력하신 정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게 파기됩니다.
        </p>
      </div>
    </OrderPageLayout>
  );
}
