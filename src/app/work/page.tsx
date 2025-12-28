import { Metadata } from 'next';
import WorkContent from '@/components/work/WorkContent';
import projectsData from '@/data/projects.json';
import { ProjectsData } from '@/types/project';

export const metadata: Metadata = {
    title: 'Work | KRINOK',
    description: 'Explore our portfolio of immersive shows, brand content, and digital experiences.',
};

export default function WorkPage() {
    const data = projectsData as ProjectsData;

    return (
        <WorkContent
            projects={data.projects}
            categories={data.categories}
            tags={data.tags}
        />
    );
}
