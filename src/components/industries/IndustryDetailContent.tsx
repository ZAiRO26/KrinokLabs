'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface Solution {
    title: string;
    description: string;
}

interface CaseStudy {
    client: string;
    result: string;
    description: string;
}

interface IndustryData {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    stats: { value: string; label: string };
    solutions: Solution[];
    caseStudies: CaseStudy[];
    technologies: string[];
}

interface Props {
    industry: IndustryData;
}

export default function IndustryDetailContent({ industry }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        // Animate solutions
        const solutions = containerRef.current?.querySelectorAll('.solution-card');
        if (solutions) {
            solutions.forEach((card, i) => {
                gsap.from(card, {
                    x: i % 2 === 0 ? -40 : 40,
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

        // Animate case studies
        const cases = containerRef.current?.querySelectorAll('.case-item');
        if (cases) {
            gsap.from(cases, {
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
                scrollTrigger: {
                    trigger: '.cases-section',
                    start: 'top 75%',
                },
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="industry-detail">
            {/* Hero Section */}
            <section className="industry-hero">
                <div className="container">
                    <Link href="/industries" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        All Industries
                    </Link>

                    <p className="label">{industry.subtitle}</p>
                    <h1 className="heading-xl">{industry.title}</h1>
                    <p className="industry-hero__desc body-lg">{industry.description}</p>

                    <div className="industry-hero__stat">
                        <span className="stat-value">{industry.stats.value}</span>
                        <span className="stat-label">{industry.stats.label}</span>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="hero-gradient" />
                <div className="hero-pattern" />
            </section>

            {/* Solutions Grid */}
            <section className="solutions-section section">
                <div className="container">
                    <p className="label">What We Deliver</p>
                    <h2 className="heading-lg">Industry Solutions</h2>

                    <div className="solutions-grid">
                        {industry.solutions.map((solution, index) => (
                            <div
                                key={solution.title}
                                className="solution-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="solution-num">0{index + 1}</div>
                                <div className="solution-content">
                                    <h3 className="heading-sm">{solution.title}</h3>
                                    <p className="body-md">{solution.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="cases-section section" style={{ background: 'var(--color-white)', color: 'var(--color-black)' }}>
                <div className="container">
                    <p className="label" style={{ color: 'var(--color-gray)' }}>Success Stories</p>
                    <h2 className="heading-lg">Case Studies</h2>

                    <div className="cases-grid">
                        {industry.caseStudies.map((caseStudy) => (
                            <div
                                key={caseStudy.client}
                                className="case-item"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="case-result">{caseStudy.result}</div>
                                <h3 className="heading-sm">{caseStudy.client}</h3>
                                <p className="body-md">{caseStudy.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="tech-section section">
                <div className="container">
                    <p className="label">Tech Stack</p>
                    <h2 className="heading-lg">Technologies We Use</h2>

                    <div className="tech-grid">
                        {industry.technologies.map((tech) => (
                            <span key={tech} className="tech-pill">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="heading-lg">Ready to transform your {industry.title.split(' ')[0].toLowerCase()} business?</h2>
                        <p className="body-lg">Let&apos;s discuss how we can help you achieve your goals.</p>
                        <Link
                            href="/contact"
                            className="cta-button"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            Get Started
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .industry-detail {
          min-height: 100vh;
        }

        .industry-hero {
          position: relative;
          padding: 12rem 0 6rem;
          overflow: hidden;
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

        .industry-hero__desc {
          max-width: 60ch;
          color: var(--color-gray);
          margin-top: 1.5rem;
        }

        .industry-hero__stat {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .stat-value {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          color: var(--color-accent);
          line-height: 1;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--color-gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .hero-gradient {
          position: absolute;
          top: 0;
          right: -20%;
          width: 60%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(255,51,51,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-pattern {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to top, var(--color-black), transparent);
          pointer-events: none;
        }

        .solutions-section {
          padding: 6rem 0;
        }

        .solutions-grid {
          display: grid;
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .solution-card {
          display: flex;
          gap: 2rem;
          padding: 2.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          transition: all 0.4s var(--transition-smooth);
        }

        .solution-card:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.03);
          transform: translateX(10px);
        }

        .solution-num {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-accent);
          opacity: 0.3;
          line-height: 1;
        }

        .solution-content h3 {
          margin-bottom: 0.5rem;
        }

        .solution-content p {
          color: var(--color-gray);
        }

        .cases-section {
          padding: 6rem 0;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .case-item {
          padding: 2.5rem;
          background: var(--color-black);
          color: var(--color-white);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .case-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .case-result {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        .case-item h3 {
          margin-bottom: 0.5rem;
        }

        .case-item p {
          color: var(--color-gray);
        }

        .tech-section {
          padding: 6rem 0;
        }

        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        .tech-pill {
          padding: 0.75rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--color-white);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tech-pill:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.1);
        }

        .cta-section {
          padding: 6rem 0;
        }

        .cta-card {
          padding: 4rem;
          background: linear-gradient(135deg, var(--color-accent) 0%, #cc2929 100%);
          border-radius: 20px;
          text-align: center;
        }

        .cta-card h2, .cta-card p {
          color: var(--color-white);
        }

        .cta-card p {
          opacity: 0.9;
          margin-top: 1rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          margin-top: 2rem;
          background: var(--color-white);
          color: var(--color-black);
          border-radius: 100px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .industry-hero {
            padding: 8rem 0 4rem;
          }

          .solution-card {
            flex-direction: column;
            gap: 1rem;
          }

          .cases-grid {
            grid-template-columns: 1fr;
          }

          .cta-card {
            padding: 2.5rem;
          }
        }
      `}</style>
        </div>
    );
}
