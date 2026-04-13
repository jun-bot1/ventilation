'use client';

import { useEffect, useState } from 'react';

interface Consultation {
  consultationId: string;
  selectedCategory: string;
  selectedModel: string;
  orderType: string;
  paymentMethod: string;
  installationType: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerAddressDetail: string;
  selectedPyeong: string;
  selectedController: string;
  selectedMonitor: string;
  rentalPrice: number;
  purchasePrice: number;
  pyeongLabel: string;
  controllerLabel: string;
  monitorLabel: string;
  photos: Record<string, string>;
  submittedAt: string;
  receivedAt: string;
}

const MODEL_NAMES: Record<string, string> = {
  THE6500_150: '제습환기 THE650 (150)',
  THE6500_200: '제습환기 매직플러스 THE650 (200)',
  TAA531: '환기청정 매직플러스 TAA531/TAA530',
  TAA530: '환기청정 TAA531/TAA530',
  TAE530: '환기청정 매직플러스 TAE530/TAE330',
  TAE330: '환기청정 TAE530/TAE330',
};

const CATEGORY_NAMES: Record<string, string> = {
  dehumidifier: '제습환기',
  'air-purifier': '환기청정',
};

const PHOTO_LABELS: Record<string, string> = {
  leftMachine: '기존 환기 기계 (왼쪽)',
  rightMachine: '기존 환기 기계 (오른쪽)',
  diffuser1: '내부 디퓨저 1',
  diffuser2: '내부 디퓨저 2',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Consultation | null>(null);
  const [photoModal, setPhotoModal] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/consultation')
      .then((res) => res.json())
      .then((json) => {
        setConsultations(json.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">나비엔 환기 관리자</h1>
          <span className="text-sm text-gray-500">총 {consultations.length}건</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center py-20 text-gray-500">불러오는 중...</div>
        ) : consultations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">아직 신청 내역이 없습니다</p>
            <p className="text-gray-400 text-sm">상담 신청이 들어오면 여기에 표시됩니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">신청일시</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">고객명</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">전화번호</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">제품</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">구분</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">주문방식</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">카드</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">사진</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">상세</th>
                  </tr>
                </thead>
                <tbody>
                  {consultations.map((c) => {
                    const photoCount = Object.keys(c.photos ?? {}).length;
                    return (
                      <tr
                        key={c.consultationId}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDate(c.receivedAt)}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{c.customerName || '-'}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.customerPhone || '-'}</td>
                        <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{MODEL_NAMES[c.selectedModel] ?? c.selectedModel}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                            c.selectedCategory === 'dehumidifier' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                          }`}>
                            {CATEGORY_NAMES[c.selectedCategory] ?? c.selectedCategory}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                            c.orderType === 'rental' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'
                          }`}>
                            {c.orderType === 'rental' ? '렌탈' : '구매'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {c.paymentMethod === 'lotte' ? '롯데카드' : c.paymentMethod === 'hana' ? '하나카드' : c.paymentMethod === 'none' ? '없음' : c.paymentMethod}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {photoCount > 0 ? (
                            <span className="inline-block px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700">
                              {photoCount}장
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">없음</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => setSelected(c)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* 상세 모달 */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="absolute inset-0" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">상담 신청 상세</h2>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5L15 15M15 5L5 15" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-5 max-h-[75dvh] overflow-y-auto">
              {/* 접수 정보 */}
              <Section title="접수 정보">
                <DetailRow label="접수번호" value={selected.consultationId} />
                <DetailRow label="신청일시" value={formatDate(selected.receivedAt)} />
              </Section>

              {/* 고객 정보 */}
              <Section title="고객 정보">
                <DetailRow label="고객명" value={selected.customerName} />
                <DetailRow label="전화번호" value={selected.customerPhone} />
                <DetailRow label="주소" value={
                  selected.customerAddress
                    ? `${selected.customerAddress} ${selected.customerAddressDetail ?? ''}`
                    : undefined
                } />
              </Section>

              {/* 주문 정보 */}
              <Section title="주문 정보">
                <DetailRow label="제품" value={MODEL_NAMES[selected.selectedModel] ?? selected.selectedModel} />
                <DetailRow label="카테고리" value={CATEGORY_NAMES[selected.selectedCategory] ?? selected.selectedCategory} />
                <DetailRow label="주문방식" value={selected.orderType === 'rental' ? '렌탈' : '구매'} />
                <DetailRow label="결제카드" value={
                  selected.paymentMethod === 'lotte' ? '롯데카드'
                    : selected.paymentMethod === 'hana' ? '하나카드'
                    : selected.paymentMethod === 'none' ? '없음'
                    : selected.paymentMethod
                } />
                <DetailRow label="설치유형" value={
                  selected.installationType === 'new-building' ? '신규 설치'
                    : selected.installationType === 'renovation' ? '기존 교체'
                    : selected.installationType
                } />
              </Section>

              {/* 선택 옵션 */}
              <Section title="선택 옵션">
                <DetailRow label="평형" value={selected.pyeongLabel || '-'} />
                <DetailRow label="룸컨트롤러" value={selected.controllerLabel || '-'} />
                <DetailRow label="에어모니터" value={selected.monitorLabel || '-'} />
              </Section>

              {/* 금액 */}
              <Section title="금액">
                {selected.orderType === 'rental' && (
                  <DetailRow label="렌탈 월 금액" value={selected.rentalPrice ? `${selected.rentalPrice.toLocaleString()}원` : '-'} highlight />
                )}
                {selected.orderType === 'purchase' && (
                  <DetailRow label="구매 금액" value={selected.purchasePrice ? `${selected.purchasePrice.toLocaleString()}원` : '-'} highlight />
                )}
              </Section>

              {/* 첨부 사진 */}
              {Object.keys(selected.photos ?? {}).length > 0 && (
                <Section title="첨부 사진">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selected.photos).map(([slot, src]) => (
                      <div key={slot} className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPhotoModal(src)}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
                        >
                          <img src={src} alt={PHOTO_LABELS[slot] ?? slot} className="w-full h-full object-cover" />
                        </button>
                        <span className="text-xs text-gray-500 text-center">{PHOTO_LABELS[slot] ?? slot}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 사진 확대 모달 */}
      {photoModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70"
          onClick={() => setPhotoModal(null)}
        >
          <button
            onClick={() => setPhotoModal(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <img
            src={photoModal}
            alt="확대 사진"
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
      <div className="border-b border-dashed border-gray-200 mt-4" />
    </div>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium text-right ml-4 ${highlight ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>
        {value || '-'}
      </span>
    </div>
  );
}
