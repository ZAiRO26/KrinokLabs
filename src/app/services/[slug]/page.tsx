import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailContent from '@/components/services/ServiceDetailContent';
import servicePages from '@/data/servicePages.json';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return servicePages.services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = servicePages.services.find((s) => s.slug === slug);

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | KRINOK`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = servicePages.services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <ServiceDetailContent service={service} />;
}
