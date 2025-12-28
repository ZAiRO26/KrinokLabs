import { Metadata } from 'next';
import CareersContent from '@/components/about/CareersContent';

export const metadata: Metadata = {
  title: 'Careers | KRINOK',
  description: 'Join our team of innovators. Explore career opportunities at KRINOK.',
};

export default function CareersPage() {
  return <CareersContent />;
}
