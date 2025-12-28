'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import HeroText from '@/components/home/HeroText';

// Dynamic import for R3F to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-scene-loading" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const { setCursorState, setLoading } = useStore();

  useGSAP(() => {
    // Mark loading complete after scene initializes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Parallax effect for 3D scene - moves slower than content
    if (sceneWrapperRef.current && heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          // 3D scene moves at 30% of scroll speed (parallax)
          const yOffset = self.progress * 300 * 0.3;
          gsap.set(sceneWrapperRef.current, {
            y: yOffset,
          });
        },
      });
    }

    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="home">
      {/* Hero Section with 3D Background */}
      <section ref={heroRef} className="hero section">
        {/* 3D Scene Background */}
        <div ref={sceneWrapperRef} className="hero-scene-wrapper">
          <HeroScene />
        </div>

        {/* Hero Content */}
        <div className="hero__content">
          <p className="label">Independent Creative Agency</p>
          <HeroText text="WE ARE TURNING ORDINARY INTO BREATHTAKING" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="services section">
        <div className="container">
          <div className="services__grid">
            <div
              className="service-box"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <span className="label">01</span>
              <h3 className="heading-md">Immersive Shows</h3>
              <p className="body-lg">
                Creating unforgettable live experiences through projection mapping and interactive installations.
              </p>
            </div>

            <div
              className="service-box"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <span className="label">02</span>
              <h3 className="heading-md">Brand Content</h3>
              <p className="body-lg">
                Crafting visual narratives that resonate with audiences and elevate brand identity.
              </p>
            </div>

            <div
              className="service-box"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <span className="label">03</span>
              <h3 className="heading-md">Digital Experiences</h3>
              <p className="body-lg">
                Building cutting-edge digital products that push the boundaries of interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="expertise section" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
        <div className="container">
          <p className="label" style={{ color: 'var(--color-gray)' }}>Expertise & Vision</p>
          <h2 className="heading-lg" style={{ marginTop: '2rem', maxWidth: '60ch' }}>
            We are content Directors, we create vision and deliver finest creative & art direction thru all type of mediums by blending design, motion, and technology.
          </h2>
        </div>
      </section>

      {/* Temporary Footer */}
      <footer className="section" style={{ minHeight: 'auto', padding: '4rem' }}>
        <div className="container">
          <p className="label">© 2024 KRINOK. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .hero {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 8rem;
          position: relative;
          overflow: hidden;
        }

        .hero-scene-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-scene-loading {
          position: absolute;
          inset: 0;
          background: var(--color-black);
        }

        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          padding: 0 2rem;
        }

        .services__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4rem;
        }

        @media (max-width: 968px) {
          .services__grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .service-box {
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .service-box h3 {
          margin: 1rem 0;
        }

        .service-box p {
          color: var(--color-gray);
        }

        .expertise {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
