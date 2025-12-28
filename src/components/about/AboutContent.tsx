'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { setCursorState } = useStore();

    useGSAP(() => {
        // Animate SVG annotations on scroll
        const paths = document.querySelectorAll('.annotation-path');

        paths.forEach((path) => {
            const pathElement = path as SVGPathElement;
            const length = pathElement.getTotalLength();

            gsap.set(pathElement, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            gsap.to(pathElement, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: pathElement,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="about-page">
            {/* Graph Paper Background */}
            <div className="graph-paper" />

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <p className="label">About Us</p>
                    <h1 className="heading-xl">
                        THINKERS<br />AND MAKERS
                    </h1>
                </div>

                {/* SVG Arrow Annotation */}
                <svg className="annotation" viewBox="0 0 200 100" style={{ top: '60%', left: '60%' }}>
                    <path
                        className="annotation-path"
                        d="M10,50 Q50,10 100,50 T190,50"
                        fill="none"
                        stroke="#FF3333"
                        strokeWidth="2"
                    />
                    <polygon
                        points="180,45 195,50 180,55"
                        fill="#FF3333"
                    />
                </svg>
            </section>

            {/* Intro Section */}
            <section className="about-intro section">
                <div className="container">
                    <div className="intro-grid">
                        <div className="intro-text">
                            <h2 className="heading-lg">
                                We provide creative direction and build unique relationships,
                                to design projects that will have the best impact for our clients.
                            </h2>
                        </div>
                        <div className="intro-description">
                            <p className="body-lg">
                                Founded in 2020, Krinok is an independent creative agency specializing
                                in immersive experiences, brand content, and digital products. We blend
                                design, motion, and technology to turn ordinary ideas into breathtaking realities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Circle annotation */}
                <svg className="annotation" viewBox="0 0 100 100" style={{ top: '30%', right: '10%' }}>
                    <circle
                        className="annotation-path"
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1"
                    />
                </svg>
            </section>

            {/* Values Section */}
            <section className="about-values section">
                <div className="container">
                    <p className="label">Our Values</p>

                    <div className="values-grid">
                        {[
                            { num: '01', title: 'Vision First', desc: 'We start with a clear creative vision before diving into execution.' },
                            { num: '02', title: 'Craft Matters', desc: 'Every detail is considered, every pixel is intentional.' },
                            { num: '03', title: 'Push Boundaries', desc: 'We embrace new technologies and unconventional approaches.' },
                            { num: '04', title: 'Collaborate', desc: 'The best work comes from genuine partnerships with our clients.' },
                        ].map((value) => (
                            <div
                                key={value.num}
                                className="value-card"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <span className="value-num">{value.num}</span>
                                <h3 className="heading-md">{value.title}</h3>
                                <p className="body-lg">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-team section" style={{ background: 'var(--color-white)', color: 'var(--color-black)' }}>
                <div className="container">
                    <p className="label" style={{ color: 'var(--color-gray)' }}>The Team</p>
                    <h2 className="heading-lg" style={{ marginBottom: '3rem' }}>
                        A collective of designers, developers, and dreamers.
                    </h2>

                    <div className="team-grid">
                        {[
                            { name: 'Alex Chen', role: 'Founder & Creative Director' },
                            { name: 'Sarah Kim', role: 'Head of Technology' },
                            { name: 'Marcus Webb', role: 'Design Director' },
                            { name: 'Elena Rossi', role: 'Producer' },
                        ].map((member, i) => (
                            <div
                                key={member.name}
                                className="team-member"
                                onMouseEnter={() => setCursorState('hover')}
                                onMouseLeave={() => setCursorState('default')}
                            >
                                <div
                                    className="team-member__image"
                                    style={{
                                        background: `linear-gradient(135deg, 
                      hsl(${(i * 60) % 360}, 20%, 80%), 
                      hsl(${(i * 60 + 40) % 360}, 30%, 70%)
                    )`,
                                    }}
                                />
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
        .about-page {
          position: relative;
          min-height: 100vh;
        }

        .graph-paper {
          position: fixed;
          inset: 0;
          z-index: 0;
          opacity: 0.03;
          background-image: 
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .container {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .about-hero {
          position: relative;
          padding: 12rem 4rem 8rem;
        }

        .about-hero h1 {
          margin-top: 1rem;
        }

        .annotation {
          position: absolute;
          width: 150px;
          height: 100px;
          pointer-events: none;
          z-index: 2;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .intro-description {
          color: var(--color-gray);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3rem;
          margin-top: 3rem;
        }

        .value-card {
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .value-num {
          font-size: 0.75rem;
          color: var(--color-accent);
          margin-bottom: 1rem;
          display: block;
        }

        .value-card h3 {
          margin-bottom: 1rem;
        }

        .value-card p {
          color: var(--color-gray);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .team-member__image {
          aspect-ratio: 3/4;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .team-member h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .team-member p {
          font-size: 0.875rem;
          color: var(--color-gray);
        }

        @media (max-width: 1024px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 8rem 1.5rem 4rem;
          }

          .annotation {
            display: none;
          }
        }
      `}</style>
        </div>
    );
}
