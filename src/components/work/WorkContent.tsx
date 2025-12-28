'use client';

import ProjectGrid from '@/components/work/ProjectGrid';
import { Project, Category } from '@/types/project';

interface WorkContentProps {
  projects: Project[];
  categories: Category[];
  tags: string[];
}

export default function WorkContent({
  projects,
  categories,
  tags
}: WorkContentProps) {
  return (
    <div className="work-page">
      {/* Hero Section */}
      <section className="work-hero">
        <div className="container">
          <p className="label">Our Work</p>
          <h1 className="heading-xl">
            SELECTED<br />PROJECTS
          </h1>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="work-grid section">
        <div className="container">
          <ProjectGrid
            projects={projects}
            categories={categories}
            tags={tags}
          />
        </div>
      </section>

      <style jsx>{`
        .work-page {
          min-height: 100vh;
        }

        .work-hero {
          padding: 12rem 4rem 4rem;
        }

        .work-hero h1 {
          margin-top: 1rem;
        }

        .work-grid {
          padding-top: 0;
        }

        .container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        @media (max-width: 768px) {
          .work-hero {
            padding: 6rem 1rem 2rem;
          }
          
          .container {
            padding: 0 1rem;
          }
          
          .work-grid {
            padding: 2rem 0;
          }
        }
      `}</style>
    </div>
  );
}
