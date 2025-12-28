'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import industryPages from '@/data/industryPages.json';

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useStore();

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.industry-card');
    if (cards) {
      cards.forEach((card, i) => {
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
    <div ref={containerRef} className="industries-page">
      {/* Hero Section */}
      <section className="industries-hero section">
        <div className="container">
          <p className="label">Industries We Serve</p>
          <h1 className="heading-xl">Sector-Specific Solutions</h1>
          <p className="body-lg industries-hero__subtitle">
            Tailored digital solutions for the unique challenges of your industry.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="industries-grid section">
        <div className="container">
          {industryPages.industries.map((industry, index) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="industry-card"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <div className="industry-card__content">
                <span className="label">0{index + 1}</span>
                <h2 className="heading-md">{industry.title}</h2>
                <p className="body-md">{industry.description}</p>
                
                <div className="industry-card__solutions">
                  {industry.solutions.slice(0, 3).map((solution) => (
                    <span key={solution.title} className="solution-tag">{solution.title}</span>
                  ))}
                </div>
              </div>
              
              <div className="industry-card__stat">
                <span className="stat-value">{industry.stats.value}</span>
                <span className="stat-label">{industry.stats.label}</span>
              </div>
              
              <span className="industry-card__arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="industries-cta section">
        <div className="container">
          <div className="cta-card">
            <h2 className="heading-lg">Don&apos;t see your industry?</h2>
            <p className="body-lg">We work with businesses across all sectors. Let&apos;s discuss your needs.</p>
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
        .industries-hero {
          padding-top: 12rem;
          padding-bottom: 4rem;
        }

        .industries-hero__subtitle {
          max-width: 60ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .industries-grid {
          padding: 4rem 0;
        }

        .industry-card {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.4s var(--transition-smooth);
        }

        .industry-card:hover {
          border-color: var(--color-accent);
          background: rgba(255, 51, 51, 0.03);
          transform: translateX(10px);
        }

        .industry-card__content {
          flex: 1;
        }

        .industry-card__content .label {
          margin-bottom: 1rem;
        }

        .industry-card__content .body-md {
          color: var(--color-gray);
          margin-top: 0.5rem;
          max-width: 50ch;
        }

        .industry-card__solutions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .solution-tag {
          padding: 0.4rem 0.8rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 100px;
          color: var(--color-gray);
        }

        .industry-card__stat {
          text-align: right;
          padding: 0 3rem;
        }

        .stat-value {
          display: block;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 700;
          color: var(--color-accent);
          line-height: 1;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: var(--color-gray);
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .industry-card__arrow {
          color: var(--color-accent);
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .industry-card:hover .industry-card__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .industries-cta {
          padding: 4rem 0;
        }

        .cta-card {
          padding: 4rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          text-align: center;
        }

        .cta-card p {
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .cta-button {
          display: inline-block;
          padding: 1rem 2.5rem;
          margin-top: 2rem;
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
          .industries-hero {
            padding-top: 8rem;
          }

          .industry-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .industry-card__stat {
            text-align: left;
            padding: 0;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
          }

          .stat-value {
            font-size: clamp(2.5rem, 10vw, 3.5rem);
          }

          .cta-card {
            padding: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
