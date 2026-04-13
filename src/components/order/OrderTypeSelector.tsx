'use client';

import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { OrderType } from '@/types';

interface OrderTypeSelectorProps {
  selected: OrderType | null;
  onSelect: (type: OrderType) => void;
}

const OPTIONS: { id: OrderType; title: string; subtitle: string; description: string }[] = [
  {
    id: 'rental',
    title: '렌탈',
    subtitle: '부담 없이 시작하기',
    description: '월 납부금으로 초기 비용 없이 이용하세요. 정기 관리 서비스가 포함됩니다.',
  },
  {
    id: 'purchase',
    title: '구매',
    subtitle: '한 번에 구매하기',
    description: '일시불로 제품을 소유하세요. 제휴 카드 할인 혜택을 받을 수 있습니다.',
  },
];

export default function OrderTypeSelector({ selected, onSelect }: OrderTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {OPTIONS.map((option) => (
        <Card
          key={option.id}
          selected={selected === option.id}
          onClick={() => onSelect(option.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900">{option.title}</p>
              <p className="text-sm font-medium text-primary-500 mt-0.5">{option.subtitle}</p>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{option.description}</p>
            </div>
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 ml-3 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all',
                selected === option.id
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              )}
            >
              {selected === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
