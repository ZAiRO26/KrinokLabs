import { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
    title: 'About | KRINOK',
    description: 'Learn about KRINOK - a collective of thinkers and makers creating extraordinary experiences.',
};

export default function AboutPage() {
    return <AboutContent />;
}
