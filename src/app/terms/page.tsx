import { Metadata } from 'next';
import LegalContent from '@/components/legal/LegalContent';

export const metadata: Metadata = {
    title: 'Terms of Service | KRINOK',
    description: 'Terms and conditions for using our services.',
};

const termsContent = {
    title: 'Terms of Service',
    lastUpdated: 'December 2024',
    sections: [
        {
            title: 'Acceptance of Terms',
            content: 'By accessing and using our website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
        },
        {
            title: 'Services',
            content: 'We provide web development, mobile app development, UI/UX design, AI solutions, and related digital services. The specific scope of work for each project will be defined in a separate agreement.'
        },
        {
            title: 'Intellectual Property',
            content: 'All content on this website, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by intellectual property laws. Upon full payment, clients receive full ownership of custom work created for their projects.'
        },
        {
            title: 'Payment Terms',
            content: 'Payment terms will be specified in individual project agreements. Standard terms require a deposit before work begins, with remaining balance due upon delivery or according to milestone schedules.'
        },
        {
            title: 'Limitation of Liability',
            content: 'To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.'
        },
        {
            title: 'Governing Law',
            content: 'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through good-faith negotiation or mediation.'
        },
        {
            title: 'Changes to Terms',
            content: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.'
        }
    ]
};

export default function TermsPage() {
    return <LegalContent content={termsContent} />;
}
