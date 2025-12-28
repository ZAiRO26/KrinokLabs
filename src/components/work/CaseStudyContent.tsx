'use client';

import Link from 'next/link';
import { Project } from '@/types/project';

interface CaseStudyContentProps {
    project: Project;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
    return (
        <div className="case-study">
            {/* Back Link */}
            <div className="case-study__back">
                <Link href="/work" className="back-link">
                    ← Back to Work
                </Link>
            </div>

            {/* Main Content */}
            <div className="case-study__grid">
                {/* Media Column (2/3) */}
                <div className="case-study__media">
                    {/* Hero Image Placeholder */}
                    <div
                        className="case-study__hero-image"
                        style={{
                            background: `linear-gradient(135deg, 
                hsl(${(project.id.length * 40) % 360}, 30%, 15%), 
                hsl(${(project.id.length * 40 + 60) % 360}, 40%, 25%)
              )`,
                        }}
                    />

                    {/* Additional Content */}
                    <div className="case-study__content">
                        <p className="body-lg">{project.description}</p>

                        <div className="case-study__gallery">
                            {/* Gallery placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="gallery-item"
                                    style={{
                                        background: `linear-gradient(${45 + i * 30}deg, 
                      hsl(${(project.id.length * 40 + i * 30) % 360}, 25%, 20%), 
                      hsl(${(project.id.length * 40 + i * 30 + 40) % 360}, 35%, 30%)
                    )`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Metadata Column (1/3 - Sticky) */}
                <aside className="case-study__meta">
                    <div className="case-study__meta-inner">
                        <div className="meta-group">
                            <span className="label">Project</span>
                            <h1 className="heading-lg">{project.title}</h1>
                        </div>

                        <div className="meta-group">
                            <span className="label">Client</span>
                            <p>{project.client}</p>
                        </div>

                        <div className="meta-group">
                            <span className="label">Year</span>
                            <p>{project.year}</p>
                        </div>

                        <div className="meta-group">
                            <span className="label">Services</span>
                            <ul className="services-list">
                                {project.services.map((service) => (
                                    <li key={service}>{service}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="meta-group">
                            <span className="label">Tags</span>
                            <div className="tags-list">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
        .case-study {
          min-height: 100vh;
          padding-top: 6rem;
        }

        .case-study__back {
          padding: 2rem 4rem;
        }

        .back-link {
          font-size: 0.875rem;
          color: var(--color-gray);
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: var(--color-white);
        }

        .case-study__grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          padding: 0 4rem 4rem;
        }

        .case-study__media {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .case-study__hero-image {
          aspect-ratio: 16/10;
          border-radius: 8px;
        }

        .case-study__content {
          padding: 2rem 0;
        }

        .case-study__gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .gallery-item {
          aspect-ratio: 4/3;
          border-radius: 4px;
        }

        .gallery-item:first-child {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }

        .case-study__meta {
          position: relative;
        }

        .case-study__meta-inner {
          position: sticky;
          top: 8rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .meta-group {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .meta-group:last-child {
          border-bottom: none;
        }

        .meta-group .label {
          margin-bottom: 0.5rem;
          display: block;
        }

        .meta-group p,
        .meta-group li {
          font-size: 1rem;
          color: var(--color-white);
        }

        .services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .tags-list {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: var(--color-dark-gray);
          border-radius: 4px;
          color: var(--color-gray);
        }

        @media (max-width: 1024px) {
          .case-study__grid {
            grid-template-columns: 1fr;
            padding: 0 2rem 4rem;
          }

          .case-study__meta-inner {
            position: relative;
            top: 0;
          }

          .case-study__back {
            padding: 2rem;
          }
        }
      `}</style>
        </div>
    );
}
