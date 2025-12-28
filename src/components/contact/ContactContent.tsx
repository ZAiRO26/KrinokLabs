'use client';

import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';

// Dynamic import for R3F to avoid SSR issues
const OfficeScene = dynamic(() => import('@/components/three/OfficeScene'), {
    ssr: false,
    loading: () => <div className="scene-loading" />,
});

export default function ContactContent() {
    const { setCursorState } = useStore();

    return (
        <div className="contact-page">
            {/* 3D Office Scene Background */}
            <div className="contact-scene">
                <OfficeScene />
            </div>

            {/* Contact Overlay */}
            <div className="contact-overlay">
                <div className="contact-content">
                    {/* Header */}
                    <div className="contact-header">
                        <p className="label">Get in Touch</p>
                        <h1 className="heading-xl">
                            LET&apos;S CREATE<br />TOGETHER
                        </h1>
                    </div>

                    {/* Contact Info Cards */}
                    <div className="contact-cards">
                        {/* Email Card */}
                        <a
                            href="mailto:hello@krinok.com"
                            className="contact-card"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            <span className="contact-card__label">Email</span>
                            <span className="contact-card__value">hello@krinok.com</span>
                        </a>

                        {/* Phone Card */}
                        <a
                            href="tel:+12345678900"
                            className="contact-card"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            <span className="contact-card__label">Phone</span>
                            <span className="contact-card__value">+1 (234) 567-8900</span>
                        </a>

                        {/* Location Card */}
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-card"
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            <span className="contact-card__label">Office</span>
                            <span className="contact-card__value">123 Creative Ave, NYC</span>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="contact-social">
                        <p className="label">Follow Us</p>
                        <div className="social-links">
                            {['LinkedIn', 'Instagram', 'Vimeo', 'Twitter'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social.toLowerCase()}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    onMouseEnter={() => setCursorState('hover')}
                                    onMouseLeave={() => setCursorState('default')}
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="contact-cta">
                    <p className="body-lg">
                        Move your mouse to explore our virtual office space
                    </p>
                </div>
            </div>

            <style jsx>{`
        .contact-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .contact-scene {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .scene-loading {
          position: fixed;
          inset: 0;
          background: var(--color-black);
        }

        .contact-overlay {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8rem 4rem 4rem;
          background: linear-gradient(
            135deg,
            rgba(5, 5, 5, 0.8) 0%,
            rgba(5, 5, 5, 0.4) 50%,
            rgba(5, 5, 5, 0.6) 100%
          );
        }

        .contact-content {
          max-width: 800px;
        }

        .contact-header {
          margin-bottom: 4rem;
        }

        .contact-header h1 {
          margin-top: 1rem;
        }

        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 4rem;
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          transition: all 0.3s var(--transition-smooth);
        }

        .contact-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-accent);
          transform: translateX(10px);
        }

        .contact-card__label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gray);
          margin-bottom: 0.5rem;
        }

        .contact-card__value {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--color-white);
        }

        .contact-social {
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }

        .social-link {
          font-size: 1rem;
          color: var(--color-gray);
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: var(--color-accent);
        }

        .contact-cta {
          text-align: center;
          color: var(--color-gray);
        }

        @media (max-width: 768px) {
          .contact-overlay {
            padding: 6rem 1.5rem 2rem;
          }

          .contact-card__value {
            font-size: 1.25rem;
          }

          .social-links {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
}
