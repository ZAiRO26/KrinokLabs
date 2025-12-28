import { Metadata } from 'next';
import HowWeWorkContent from '@/components/about/HowWeWorkContent';

export const metadata: Metadata = {
    title: 'How We Work | KRINOK',
    description: 'Our proven process for delivering exceptional digital products.',
};

export default function HowWeWorkPage() {
    return <HowWeWorkContent />;
}
