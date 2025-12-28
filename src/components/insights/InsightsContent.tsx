'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import insightsData from '@/data/insights.json';

gsap.registerPlugin(ScrollTrigger);

export default function InsightsContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? insightsData.posts
        : insightsData.posts.filter(post => post.category === activeCategory);

    const featuredPosts = insightsData.posts.filter(post => post.featured);

    useGSAP(() => {
        const cards = containerRef.current?.querySelectorAll('.post-card');
        if (cards) {
            cards.forEach((card, i) => {
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                });
            });
        }
    }, { scope: containerRef, dependencies: [activeCategory] });

    return (
        <div ref={containerRef} className="insights-page">
            {/* Hero Section */}
            <section className="insights-hero section">
                <div className="container">
                    <p className="label">Knowledge Hub</p>
                    <h1 className="heading-xl">Insights & Articles</h1>
                    <p className="body-lg insights-hero__subtitle">
                        Thoughts on technology, design, and building successful digital products.
                    </p>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="featured-section section">
                <div className="container">
                    <p className="label">Featured</p>
                    <div className="featured-grid">
                        {featuredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/insights/${post.slug}`}
                                className="featured-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="featured-card__image" />
                                <div className="featured-card__content">
                                    <span className="post-category">{post.category}</span>
                                    <h2 className="heading-md">{post.title}</h2>
                                    <p className="body-md">{post.excerpt}</p>
                                    <div className="post-meta">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="filter-section">
                <div className="container">
                    <div className="filter-pills">
                        <button
                            className={`filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('All')}
                        >
                            All
                        </button>
                        {insightsData.categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Posts Grid */}
            <section className="posts-section section">
                <div className="container">
                    <div className="posts-grid">
                        {filteredPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/insights/${post.slug}`}
                                className="post-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="post-card__image" />
                                <div className="post-card__content">
                                    <span className="post-category">{post.category}</span>
                                    <h3 className="heading-sm">{post.title}</h3>
                                    <p className="body-sm">{post.excerpt}</p>
                                    <div className="post-meta">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .insights-hero {
          padding-top: 12rem;
          padding-bottom: 4rem;
        }

        .insights-hero__subtitle {
          max-width: 50ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .featured-section {
          padding: 4rem 0;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .featured-card {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s var(--transition-smooth);
        }

        .featured-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-5px);
        }

        .featured-card__image {
          height: 200px;
          background: linear-gradient(135deg, rgba(255,51,51,0.2), rgba(255,51,51,0.05));
        }

        .featured-card__content {
          padding: 2rem;
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
          margin-bottom: 1rem;
        }

        .featured-card h2 {
          margin-bottom: 0.75rem;
        }

        .featured-card p {
          color: var(--color-gray);
        }

        .post-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: var(--color-gray);
        }

        .filter-section {
          padding: 2rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .filter-pills {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-pill {
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--color-gray);
          border-radius: 100px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-pill:hover {
          border-color: var(--color-white);
          color: var(--color-white);
        }

        .filter-pill.active {
          background: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-white);
        }

        .posts-section {
          padding: 4rem 0;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .post-card {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.4s var(--transition-smooth);
        }

        .post-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-5px);
        }

        .post-card__image {
          height: 160px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
        }

        .post-card__content {
          padding: 1.5rem;
        }

        .post-card h3 {
          margin-bottom: 0.5rem;
        }

        .post-card p {
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }

          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .insights-hero {
            padding-top: 8rem;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
