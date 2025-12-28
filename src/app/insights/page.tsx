import { Metadata } from 'next';
import InsightsContent from '@/components/insights/InsightsContent';

export const metadata: Metadata = {
    title: 'Insights | KRINOK',
    description: 'Knowledge hub with articles on technology, design, and business strategies.',
};

export default function InsightsPage() {
    return <InsightsContent />;
}
