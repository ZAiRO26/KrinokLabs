'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
    {
        id: 1,
        client: 'Merck Pharmaceuticals',
        industry: 'Healthcare',
        title: 'AI-Powered R&D Acceleration',
        description: 'Revolutionized research productivity with an intelligent data analysis platform that reduced research time by 99%.',
        result: '99% Faster R&D',
        services: ['AI Development', 'Data Analytics', 'Cloud Architecture']
    },
    {
        id: 2,
        client: 'PropTech Startup',
        industry: 'Real Estate',
        title: 'Hyper-Personalized Property Discovery',
        description: 'Built a machine learning platform for personalized property recommendations, increasing user engagement by 60%.',
        result: '60% More Engagement',
        services: ['Machine Learning', 'Web Development', 'UX Design']
    },
    {
        id: 3,
        client: 'E-Commerce Brand',
        industry: 'Retail',
        title: 'Mobile App Redesign',
        description: 'Complete redesign and development of their e-commerce mobile application, achieving a 4.8 star rating.',
        result: '2x Faster Delivery',
        services: ['Mobile Development', 'UI/UX Design', 'API Integration']
    }
];

const clientLogos = [
    'Merck', 'Keller Williams', 'TechCorp', 'FinanceHub', 'HealthPlus',
    'EduTech', 'RetailGiant', 'PropertyMax', 'LogiFlow', 'GreenEnergy'
];

export default function ClientsContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        const cases = containerRef.current?.querySelectorAll('.case-study');
        if (cases) {
            cases.forEach((card, i) => {
                gsap.from(card, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                });
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="clients-page">
            {/* Hero */}
            <section className="clients-hero section">
                <div className="container">
                    <p className="label">Our Clients</p>
                    <h1 className="heading-xl">Trusted by Innovators</h1>
                    <p className="body-lg clients-hero__subtitle">
                        We partner with ambitious companies to build products that matter.
                    </p>
                </div>
            </section>

            {/* Client Logos */}
            <section className="logos-section">
                <div className="container">
                    <div className="logos-grid">
                        {clientLogos.map((logo) => (
                            <div key={logo} className="logo-item">
                                <span>{logo}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="cases-section section">
                <div className="container">
                    <p className="label">Success Stories</p>
                    <h2 className="heading-lg">Featured Case Studies</h2>

                    <div className="cases-grid">
                        {caseStudies.map((study) => (
                            <div
                                key={study.id}
                                className="case-study"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="case-study__image" />
                                <div className="case-study__content">
                                    <div className="case-study__header">
                                        <span className="case-industry">{study.industry}</span>
                                        <span className="case-client">{study.client}</span>
                                    </div>
                                    <h3 className="heading-md">{study.title}</h3>
                                    <p className="body-md">{study.description}</p>
                                    <div className="case-services">
                                        {study.services.map((service) => (
                                            <span key={service} className="service-tag">{service}</span>
                                        ))}
                                    </div>
                                    <div className="case-result">
                                        <span className="result-value">{study.result}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="clients-cta section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="heading-lg">Ready to become our next success story?</h2>
                        <p className="body-lg">Let&apos;s discuss how we can help you achieve your goals.</p>
                        <Link
                            href="/contact"
                            className="cta-button"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            Start a Project
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .clients-hero {
          padding-top: 12rem;
          padding-bottom: 4rem;
        }

        .clients-hero__subtitle {
          max-width: 50ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .logos-section {
          padding: 4rem 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .logos-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          font-weight: 600;
          color: var(--color-gray);
          transition: all 0.3s ease;
        }

        .logo-item:hover {
          border-color: var(--color-accent);
          color: var(--color-white);
        }

        .cases-section {
          padding: 6rem 0;
        }

        .cases-grid {
          margin-top: 3rem;
        }

        .case-study {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          padding: 3rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          transition: all 0.4s var(--transition-smooth);
        }

        .case-study:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.03);
        }

        .case-study__image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, rgba(255,51,51,0.2), rgba(255,51,51,0.05));
          border-radius: 12px;
        }

        .case-study__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .case-industry {
          padding: 0.25rem 0.75rem;
          background: var(--color-accent);
          color: var(--color-white);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 100px;
        }

        .case-client {
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        .case-study h3 {
          margin-bottom: 0.75rem;
        }

        .case-study p {
          color: var(--color-gray);
        }

        .case-services {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .service-tag {
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          color: var(--color-gray);
        }

        .case-result {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .result-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .clients-cta {
          padding: 4rem 0;
        }

        .cta-card {
          padding: 4rem;
          background: var(--color-accent);
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

        @media (max-width: 1024px) {
          .logos-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .case-study {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .clients-hero {
            padding-top: 8rem;
          }

          .logos-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-card {
            padding: 2.5rem;
          }
        }
      `}</style>
        </div>
    );
}
