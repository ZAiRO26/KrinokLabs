'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        num: '01',
        title: 'Discovery',
        description: 'We dive deep into your business, understanding your goals, challenges, and target audience.',
        activities: ['Stakeholder interviews', 'Market research', 'Competitor analysis', 'Requirements gathering']
    },
    {
        num: '02',
        title: 'Strategy',
        description: 'We craft a comprehensive strategy that aligns technology with your business objectives.',
        activities: ['Solution architecture', 'Technology selection', 'Project roadmap', 'Risk assessment']
    },
    {
        num: '03',
        title: 'Design',
        description: 'We create intuitive, beautiful designs that users love and that drive business results.',
        activities: ['User research', 'Wireframing', 'Visual design', 'Prototyping']
    },
    {
        num: '04',
        title: 'Development',
        description: 'We build robust, scalable solutions using modern technologies and best practices.',
        activities: ['Agile sprints', 'Code reviews', 'CI/CD pipelines', 'Quality assurance']
    },
    {
        num: '05',
        title: 'Launch',
        description: 'We deploy your solution with careful planning and ensure a smooth transition.',
        activities: ['Performance testing', 'Security audit', 'Deployment', 'Training']
    },
    {
        num: '06',
        title: 'Growth',
        description: 'We continue to optimize and evolve your product based on real user feedback.',
        activities: ['Analytics review', 'Feature iterations', 'Support & maintenance', 'Scaling']
    }
];

export default function HowWeWorkContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        const steps = containerRef.current?.querySelectorAll('.process-step');
        if (steps) {
            steps.forEach((step, i) => {
                gsap.from(step, {
                    x: i % 2 === 0 ? -60 : 60,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 80%',
                    },
                });
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="how-we-work">
            {/* Hero */}
            <section className="hww-hero">
                <div className="container">
                    <Link href="/about" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        About
                    </Link>
                    <p className="label">Our Process</p>
                    <h1 className="heading-xl">How We Work</h1>
                    <p className="body-lg hww-hero__subtitle">
                        A proven methodology for delivering exceptional digital products, on time and on budget.
                    </p>
                </div>
            </section>

            {/* Process Steps */}
            <section className="process-section section">
                <div className="container">
                    {processSteps.map((step, index) => (
                        <div
                            key={step.num}
                            className="process-step"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            <div className="step-num">{step.num}</div>
                            <div className="step-content">
                                <h2 className="heading-md">{step.title}</h2>
                                <p className="body-lg">{step.description}</p>
                                <div className="step-activities">
                                    {step.activities.map((activity) => (
                                        <span key={activity} className="activity-tag">{activity}</span>
                                    ))}
                                </div>
                            </div>
                            {index < processSteps.length - 1 && <div className="step-connector" />}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="hww-cta section">
                <div className="container">
                    <div className="cta-card">
                        <h2 className="heading-lg">Ready to start your project?</h2>
                        <p className="body-lg">Let&apos;s discuss how we can help bring your vision to life.</p>
                        <Link
                            href="/contact"
                            className="cta-button"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .hww-hero {
          padding: 12rem 0 4rem;
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

        .hww-hero__subtitle {
          max-width: 50ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .process-section {
          padding: 4rem 0 6rem;
        }

        .process-step {
          position: relative;
          display: flex;
          gap: 3rem;
          padding: 3rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          transition: all 0.4s var(--transition-smooth);
        }

        .process-step:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.03);
        }

        .step-num {
          font-size: 4rem;
          font-weight: 700;
          color: var(--color-accent);
          opacity: 0.3;
          line-height: 1;
          min-width: 80px;
        }

        .step-content {
          flex: 1;
        }

        .step-content p {
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .step-activities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .activity-tag {
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          color: var(--color-gray);
        }

        .hww-cta {
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
          display: inline-block;
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
          .hww-hero {
            padding: 8rem 0 3rem;
          }

          .process-step {
            flex-direction: column;
            gap: 1.5rem;
          }

          .cta-card {
            padding: 2.5rem;
          }
        }
      `}</style>
        </div>
    );
}
