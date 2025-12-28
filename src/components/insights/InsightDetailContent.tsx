'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';

interface PostData {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    content: string;
}

interface Props {
    post: PostData;
}

export default function InsightDetailContent({ post }: Props) {
    const { setCursorState } = useStore();

    // Simple markdown-like parsing
    const formatContent = (content: string) => {
        return content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="content-h2">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                return (
                    <ul key={i} className="content-list">
                        {items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                );
            }
            if (paragraph.match(/^\d\./)) {
                const items = paragraph.split('\n');
                return (
                    <ol key={i} className="content-list">
                        {items.map((item, j) => (
                            <li key={j} dangerouslySetInnerHTML={{
                                __html: item.replace(/^\d\./, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }} />
                        ))}
                    </ol>
                );
            }
            return <p key={i} className="content-p" dangerouslySetInnerHTML={{
                __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />;
        });
    };

    return (
        <div className="insight-detail">
            {/* Hero */}
            <section className="insight-hero">
                <div className="container">
                    <Link href="/insights" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        All Insights
                    </Link>

                    <span className="post-category">{post.category}</span>
                    <h1 className="heading-xl">{post.title}</h1>

                    <div className="post-meta">
                        <span className="post-author">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="insight-content section">
                <div className="container">
                    <article className="article">
                        {formatContent(post.content)}
                    </article>
                </div>
            </section>

            {/* CTA */}
            <section className="insight-cta section">
                <div className="container">
                    <div className="cta-box">
                        <h3 className="heading-md">Want to discuss this topic?</h3>
                        <p className="body-lg">Get in touch with our experts for a consultation.</p>
                        <Link
                            href="/contact"
                            className="cta-button"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .insight-detail {
          min-height: 100vh;
        }

        .insight-hero {
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

        .post-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: var(--color-accent);
          color: var(--color-white);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .insight-hero h1 {
          max-width: 20ch;
        }

        .post-meta {
          display: flex;
          gap: 0.75rem;
          margin-top: 2rem;
          color: var(--color-gray);
        }

        .post-author {
          color: var(--color-white);
          font-weight: 500;
        }

        .insight-content {
          padding: 4rem 0;
        }

        .article {
          max-width: 70ch;
        }

        .article :global(.content-h2) {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 2.5rem 0 1rem;
        }

        .article :global(.content-p) {
          color: var(--color-gray);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .article :global(.content-list) {
          color: var(--color-gray);
          line-height: 1.8;
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .article :global(.content-list li) {
          margin-bottom: 0.75rem;
        }

        .article :global(strong) {
          color: var(--color-white);
          font-weight: 600;
        }

        .insight-cta {
          padding: 4rem 0;
        }

        .cta-box {
          padding: 3rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          text-align: center;
        }

        .cta-box p {
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2rem;
          margin-top: 1.5rem;
          background: var(--color-accent);
          color: var(--color-white);
          border-radius: 100px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .insight-hero {
            padding: 8rem 0 3rem;
          }
        }
      `}</style>
        </div>
    );
}
