import { Metadata } from 'next';
import IndustriesContent from '@/components/industries/IndustriesContent';

export const metadata: Metadata = {
    title: 'Industries | KRINOK',
    description: 'Sector-specific digital solutions for Finance, Healthcare, E-Commerce, Education, and Real Estate.',
};

export default function IndustriesPage() {
    return <IndustriesContent />;
}
