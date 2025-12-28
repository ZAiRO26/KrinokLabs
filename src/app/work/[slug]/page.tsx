import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyContent from '@/components/work/CaseStudyContent';
import projectsData from '@/data/projects.json';
import { ProjectsData } from '@/types/project';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const data = projectsData as ProjectsData;
  return data.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = projectsData as ProjectsData;
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found | KRINOK' };
  }

  return {
    title: `${project.title} | KRINOK`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const data = projectsData as ProjectsData;
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
