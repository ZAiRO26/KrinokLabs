export interface Project {
    id: string;
    title: string;
    slug: string;
    category: 'immersive' | 'brand' | 'digital';
    tags: string[];
    thumbnail: string;
    heroImage: string;
    description: string;
    client: string;
    year: string;
    services: string[];
    featured: boolean;
}

export interface Category {
    id: string;
    label: string;
}

export interface ProjectsData {
    projects: Project[];
    categories: Category[];
    tags: string[];
}
