'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

const openPositions = [
    {
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        title: 'DevOps Engineer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        title: 'Project Manager',
        department: 'Operations',
        location: 'Hybrid',
        type: 'Full-time'
    },
    {
        title: 'Digital Marketing Lead',
        department: 'Marketing',
        location: 'Remote',
        type: 'Full-time'
    }
];

const benefits = [
    { title: 'Remote First', description: 'Work from anywhere in the world' },
    { title: 'Flexible Hours', description: 'Balance work and life your way' },
    { title: 'Learning Budget', description: 'Annual budget for courses and conferences' },
    { title: 'Health Benefits', description: 'Comprehensive health coverage' },
    { title: 'Equity Options', description: 'Share in our success' },
    { title: 'Team Retreats', description: 'Annual team gatherings' }
];

export default function CareersContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        const jobs = containerRef.current?.querySelectorAll('.job-card');
        if (jobs) {
            gsap.from(jobs, {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: '.jobs-section',
                    start: 'top 75%',
                },
            });
        }
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="careers-page">
            {/* Hero */}
            <section className="careers-hero">
                <div className="container">
                    <Link href="/about" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        About
                    </Link>
                    <p className="label">Join Our Team</p>
                    <h1 className="heading-xl">Careers at KRINOK</h1>
                    <p className="body-lg careers-hero__subtitle">
                        We&apos;re building the future of digital products. Come build with us.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="benefits-section section" style={{ background: 'var(--color-white)', color: 'var(--color-black)' }}>
                <div className="container">
                    <p className="label" style={{ color: 'var(--color-gray)' }}>Why Join Us</p>
                    <h2 className="heading-lg">Perks & Benefits</h2>

                    <div className="benefits-grid">
                        {benefits.map((benefit) => (
                            <div key={benefit.title} className="benefit-card">
                                <h3 className="heading-sm">{benefit.title}</h3>
                                <p className="body-md">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="jobs-section section">
                <div className="container">
                    <p className="label">Open Positions</p>
                    <h2 className="heading-lg">Current Openings</h2>

                    <div className="jobs-list">
                        {openPositions.map((job) => (
                            <a
                                key={job.title}
                                href="mailto:careers@codetazos.com"
                                className="job-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div className="job-info">
                                    <h3 className="heading-sm">{job.title}</h3>
                                    <div className="job-meta">
                                        <span>{job.department}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <span className="job-apply">
                                    Apply
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* General Application */}
            <section className="apply-section section">
                <div className="container">
                    <div className="apply-card">
                        <h2 className="heading-md">Don&apos;t see your role?</h2>
                        <p className="body-lg">We&apos;re always looking for talented people. Send us your resume!</p>
                        <a
                            href="mailto:careers@codetazos.com"
                            className="apply-button"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            Send Resume
                        </a>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .careers-hero {
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

        .careers-hero__subtitle {
          max-width: 50ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .benefits-section {
          padding: 6rem 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .benefit-card {
          padding: 2rem;
          background: rgba(0,0,0,0.02);
          border-radius: 12px;
        }

        .benefit-card p {
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .jobs-section {
          padding: 6rem 0;
        }

        .jobs-list {
          margin-top: 3rem;
        }

        .job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .job-card:hover {
          border-color: var(--color-accent);
          background: rgba(255,51,51,0.05);
        }

        .job-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        .job-apply {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-accent);
          font-weight: 500;
        }

        .apply-section {
          padding: 4rem 0;
        }

        .apply-card {
          padding: 4rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          text-align: center;
        }

        .apply-card p {
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .apply-button {
          display: inline-block;
          padding: 1rem 2rem;
          margin-top: 1.5rem;
          background: var(--color-accent);
          color: var(--color-white);
          border-radius: 100px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .apply-button:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .careers-hero {
            padding: 8rem 0 3rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .job-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
