import { Metadata } from 'next';
import ContactContent from '@/components/contact/ContactContent';

export const metadata: Metadata = {
    title: 'Contact | KRINOK',
    description: 'Get in touch with KRINOK. Let\'s create something extraordinary together.',
};

export default function ContactPage() {
    return <ContactContent />;
}
