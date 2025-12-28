import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryDetailContent from '@/components/industries/IndustryDetailContent';
import industryPages from '@/data/industryPages.json';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return industryPages.industries.map((industry) => ({
        slug: industry.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const industry = industryPages.industries.find((i) => i.slug === slug);

    if (!industry) {
        return { title: 'Industry Not Found' };
    }

    return {
        title: `${industry.title} | KRINOK`,
        description: industry.description,
    };
}

export default async function IndustryDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const industry = industryPages.industries.find((i) => i.slug === slug);

    if (!industry) {
        notFound();
    }

    return <IndustryDetailContent industry={industry} />;
}
