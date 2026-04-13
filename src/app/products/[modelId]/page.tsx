import { PRODUCTS } from '@/lib/constants';
import ModelDetailClient from './ModelDetailClient';

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((modelId) => ({ modelId }));
}

export default function ModelDetailPage() {
  return <ModelDetailClient />;
}
