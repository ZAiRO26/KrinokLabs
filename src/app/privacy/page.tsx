import { Metadata } from 'next';
import LegalContent from '@/components/legal/LegalContent';

export const metadata: Metadata = {
    title: 'Privacy Policy | KRINOK',
    description: 'Our privacy policy and how we handle your data.',
};

const privacyContent = {
    title: 'Privacy Policy',
    lastUpdated: 'December 2024',
    sections: [
        {
            title: 'Information We Collect',
            content: 'We collect information you provide directly, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, company name, and any messages you send us.'
        },
        {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to respond to your inquiries, send you updates about our services (if you have opted in), improve our website and services, and comply with legal obligations.'
        },
        {
            title: 'Information Sharing',
            content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who help us operate our business, but only as necessary and under confidentiality agreements.'
        },
        {
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
            title: 'Your Rights',
            content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.'
        },
        {
            title: 'Contact Us',
            content: 'If you have any questions about this Privacy Policy, please contact us at hello@codetazos.com.'
        }
    ]
};

export default function PrivacyPage() {
    return <LegalContent content={privacyContent} />;
}
