import { Metadata } from 'next';
import ClientsContent from '@/components/clients/ClientsContent';

export const metadata: Metadata = {
    title: 'Clients | KRINOK',
    description: 'Our clients and success stories from around the world.',
};

export default function ClientsPage() {
    return <ClientsContent />;
}
