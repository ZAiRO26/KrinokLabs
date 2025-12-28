import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InsightDetailContent from '@/components/insights/InsightDetailContent';
import insightsData from '@/data/insights.json';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return insightsData.posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = insightsData.posts.find((p) => p.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} | KRINOK`,
        description: post.excerpt,
    };
}

export default async function InsightDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = insightsData.posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return <InsightDetailContent post={post} />;
}
