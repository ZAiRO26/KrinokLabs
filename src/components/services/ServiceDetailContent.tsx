'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface ServiceFeature {
    title: string;
    description: string;
    icon: string;
}

interface ServiceData {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    stats: { value: string; label: string };
    features: ServiceFeature[];
    technologies: string[];
    caseStudy: {
        client: string;
        result: string;
        description: string;
    };
    productList?: string[];
}

interface Props {
    service: ServiceData;
}

export default function ServiceDetailContent({ service }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        // Animate features on scroll
        const features = containerRef.current?.querySelectorAll('.feature-card');
        if (features) {
            features.forEach((card, i) => {
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

        // Animate tech pills
        const pills = containerRef.current?.querySelectorAll('.tech-pill');
        if (pills) {
            gsap.from(pills, {
                scale: 0.8,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                scrollTrigger: {
                    trigger: '.tech-section',
                    start: 'top 80%',
                },
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="service-detail">
            {/* Hero Section */}
            <section className="service-hero">
                <div className="container">
                    <Link href="/services" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        All Services
                    </Link>

                    <p className="label">{service.subtitle}</p>
                    <h1 className="heading-xl">{service.title}</h1>
                    <p className="service-hero__desc body-lg">{service.description}</p>

                    <div className="service-hero__stat">
                        <span className="stat-value">{service.stats.value}</span>
                        <span className="stat-label">{service.stats.label}</span>
                    </div>
                </div>

                {/* Decorative gradient */}
                <div className="hero-gradient" />
            </section>

            {/* Features Grid */}
            <section className="features-section section">
                <div className="container">
                    <p className="label">What We Offer</p>
                    <h2 className="heading-lg">Core Capabilities</h2>

                    <div className="features-grid">
                        {service.features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="feature-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <span className="feature-num">0{index + 1}</span>
                                <h3 className="heading-sm">{feature.title}</h3>
                                <p className="body-md">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="tech-section section" style={{ background: 'var(--color-white)', color: 'var(--color-black)' }}>
                <div className="container">
                    <p className="label" style={{ color: 'var(--color-gray)' }}>Tech Stack</p>
                    <h2 className="heading-lg">Technologies We Use</h2>

                    <div className="tech-grid">
                        {service.technologies.map((tech) => (
                            <span key={tech} className="tech-pill">{tech}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product List (if available) */}
            {service.productList && (
                <section className="products-section section">
                    <div className="container">
                        <p className="label">Full Catalog</p>
                        <h2 className="heading-lg">All Products & Services</h2>

                        <div className="products-grid">
                            {service.productList.map((product, i) => (
                                <div key={product} className="product-item">
                                    <span className="product-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="product-name">{product}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Case Study */}
            <section className="case-section section">
                <div className="container">
                    <div className="case-card">
                        <p className="label">Success Story</p>
                        <h3 className="heading-md">{service.caseStudy.client}</h3>
                        <p className="case-desc body-lg">{service.caseStudy.description}</p>
                        <div className="case-result">
                            <span className="result-value">{service.caseStudy.result}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section section" style={{ background: 'var(--color-accent)' }}>
                <div className="container">
                    <h2 className="heading-lg" style={{ color: 'var(--color-white)' }}>Ready to get started?</h2>
                    <p className="body-lg" style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem' }}>
                        Let&apos;s discuss your project and see how we can help.
                    </p>
                    <Link
                        href="/contact"
                        className="cta-button"
                        onMouseEnter={() => setCursorState('hover')}
                        onMouseLeave={() => setCursorState('default')}
                    >
                        Get in Touch
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>

            <style jsx>{`
        .service-detail {
          min-height: 100vh;
        }

        .service-hero {
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

        .service-hero__desc {
          max-width: 60ch;
          color: var(--color-gray);
          margin-top: 1.5rem;
        }

        .service-hero__stat {
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
          background: radial-gradient(ellipse at center, rgba(255,51,51,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .features-section {
          padding: 6rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          padding: 2.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          transition: all 0.4s var(--transition-smooth);
        }

        .feature-card:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.05);
          transform: translateY(-5px);
        }

        .feature-num {
          display: block;
          font-size: 0.75rem;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          margin-bottom: 0.75rem;
        }

        .feature-card p {
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
          background: var(--color-black);
          color: var(--color-white);
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .products-section {
          padding: 6rem 0;
          background: rgba(255,255,255,0.02);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2rem;
        }

        .product-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .product-item:hover {
          border-color: var(--color-accent);
        }

        .product-num {
          font-size: 0.75rem;
          color: var(--color-accent);
        }

        .product-name {
          font-size: 0.9rem;
        }

        .case-section {
          padding: 6rem 0;
        }

        .case-card {
          padding: 4rem;
          background: linear-gradient(135deg, rgba(255,51,51,0.1) 0%, rgba(255,51,51,0.02) 100%);
          border: 1px solid rgba(255,51,51,0.2);
          border-radius: 16px;
        }

        .case-desc {
          color: var(--color-gray);
          margin-top: 1rem;
          max-width: 50ch;
        }

        .case-result {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .result-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-accent);
        }

        .cta-section {
          padding: 6rem 0;
          text-align: center;
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

        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .service-hero {
            padding: 8rem 0 4rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .case-card {
            padding: 2rem;
          }
        }
      `}</style>
        </div>
    );
}
