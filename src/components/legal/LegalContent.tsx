'use client';

import Link from 'next/link';

interface Section {
    title: string;
    content: string;
}

interface LegalPageContent {
    title: string;
    lastUpdated: string;
    sections: Section[];
}

interface Props {
    content: LegalPageContent;
}

export default function LegalContent({ content }: Props) {
    return (
        <div className="legal-page">
            {/* Hero */}
            <section className="legal-hero">
                <div className="container">
                    <Link href="/" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Home
                    </Link>
                    <h1 className="heading-xl">{content.title}</h1>
                    <p className="last-updated">Last updated: {content.lastUpdated}</p>
                </div>
            </section>

            {/* Content */}
            <section className="legal-content section">
                <div className="container">
                    <article className="legal-article">
                        {content.sections.map((section, index) => (
                            <div key={index} className="legal-section">
                                <h2 className="heading-sm">{section.title}</h2>
                                <p className="body-md">{section.content}</p>
                            </div>
                        ))}
                    </article>
                </div>
            </section>

            <style jsx>{`
        .legal-page {
          min-height: 100vh;
        }

        .legal-hero {
          padding: 12rem 0 4rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-gray);
          font-size: 0.875rem;
          margin-bottom: 2rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: var(--color-white);
        }

        .last-updated {
          margin-top: 1rem;
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        .legal-content {
          padding: 4rem 0 6rem;
        }

        .legal-article {
          max-width: 70ch;
        }

        .legal-section {
          margin-bottom: 3rem;
        }

        .legal-section h2 {
          color: var(--color-white);
          margin-bottom: 1rem;
        }

        .legal-section p {
          color: var(--color-gray);
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .legal-hero {
            padding: 8rem 0 3rem;
          }
        }
      `}</style>
        </div>
    );
}
