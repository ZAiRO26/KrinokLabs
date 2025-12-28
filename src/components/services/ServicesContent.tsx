'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import servicePages from '@/data/servicePages.json';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useStore();

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.service-card');
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="services-page">
      {/* Hero Section */}
      <section className="services-hero section">
        <div className="container">
          <p className="label">What We Do</p>
          <h1 className="heading-xl">Comprehensive Digital Services</h1>
          <p className="body-lg services-hero__subtitle">
            From ideation to maintenance, we provide end-to-end solutions for your digital needs.
          </p>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="services-grid section">
        <div className="container">
          <div className="services-cards">
            {servicePages.services.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="service-card"
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
              >
                <span className="label">0{index + 1}</span>
                <h2 className="heading-md">{service.title}</h2>
                <p className="body-md">{service.subtitle}</p>
                <div className="service-card__stat">
                  <span className="stat-value">{service.stats.value}</span>
                  <span className="stat-label">{service.stats.label}</span>
                </div>
                <span className="service-card__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta section" style={{ backgroundColor: 'var(--color-accent)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="heading-lg" style={{ color: 'var(--color-white)' }}>Need a custom solution?</h2>
          <p className="body-lg" style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem' }}>
            Let&apos;s discuss your project and find the perfect approach.
          </p>
          <Link
            href="/contact"
            className="cta-button"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <style jsx>{`
        .services-hero {
          padding-top: 12rem;
          padding-bottom: 4rem;
        }

        .services-hero__subtitle {
          max-width: 60ch;
          margin-top: 1.5rem;
          color: var(--color-gray);
        }

        .services-grid {
          padding: 4rem 0;
        }

        .services-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.4s var(--transition-smooth);
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,51,51,0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .service-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-5px);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card .label {
          margin-bottom: 1rem;
        }

        .service-card h2 {
          margin-bottom: 0.5rem;
        }

        .service-card p {
          color: var(--color-gray);
          flex: 1;
        }

        .service-card__stat {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-accent);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-gray);
        }

        .service-card__arrow {
          position: absolute;
          top: 2rem;
          right: 2rem;
          color: var(--color-accent);
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .service-card:hover .service-card__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .services-cta {
          padding: 6rem 0;
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
          .services-hero {
            padding-top: 8rem;
          }

          .services-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
