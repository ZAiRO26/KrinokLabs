import { Metadata } from 'next';
import ServicesContent from '@/components/services/ServicesContent';

export const metadata: Metadata = {
    title: 'Services | KRINOK',
    description: 'Comprehensive digital services from ideation to maintenance. Web development, mobile apps, AI solutions, and more.',
};

export default function ServicesPage() {
    return <ServicesContent />;
}
