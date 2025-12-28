'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { setCursorState } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Parallax on image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: (x - centerX) / 15,
        y: (y - centerY) / 15,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorState('default');

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorState('view');
  };

  // Entry animation
  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out',
    });
  }, { scope: cardRef });

  // Determine card size based on featured and index
  const isLarge = project.featured || index === 0;
  const aspectRatio = isLarge ? '16/10' : '4/3';

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      className={`project-card ${isLarge ? 'large' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={imageRef}
        className="project-card__image"
        style={{ aspectRatio }}
      >
        {/* Placeholder gradient background */}
        <div
          className="project-card__placeholder"
          style={{
            background: `linear-gradient(135deg, 
              hsl(${(index * 40) % 360}, 30%, 15%), 
              hsl(${(index * 40 + 60) % 360}, 40%, 25%)
            )`,
          }}
        />

        {/* Glitch overlay on hover */}
        <div className="project-card__glitch" />

        {/* Scanline effect */}
        <div className="project-card__scanlines" />

        {/* Overlay with centered content */}
        <div className={`project-card__overlay ${isHovered ? 'active' : ''}`}>
          {/* Category pill */}
          <span className="project-card__category">
            {project.tags[0]}
          </span>

          {/* Title centered */}
          <h3 className="project-card__title">{project.title}</h3>

          {/* Year */}
          <span className="project-card__year">{project.year}</span>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          display: block;
          text-decoration: none;
          perspective: 1000px;
          transform-style: preserve-3d;
          border-radius: 8px;
          overflow: hidden;
        }

        .project-card__image {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          transform: translateZ(20px);
        }

        .project-card__placeholder {
          position: absolute;
          inset: 0;
          transition: transform 0.6s var(--transition-smooth);
        }

        .project-card:hover .project-card__placeholder {
          transform: scale(1.08);
        }
        
        /* Glitch effect */
        .project-card__glitch {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 51, 51, 0.1) 45%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 55%
          );
          background-size: 200% 200%;
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        
        .project-card:hover .project-card__glitch {
          opacity: 1;
          animation: glitch-shift 0.5s ease-in-out;
        }
        
        @keyframes glitch-shift {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }
        
        /* Scanlines */
        .project-card__scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .project-card:hover .project-card__scanlines {
          opacity: 1;
        }

        .project-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5, 5, 5, 0.9) 0%,
            rgba(5, 5, 5, 0.4) 40%,
            rgba(5, 5, 5, 0.2) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 2rem;
          opacity: 0.8;
          transition: opacity 0.4s ease;
        }

        .project-card__overlay.active {
          opacity: 1;
        }
        
        .project-card__category {
          display: inline-block;
          padding: 0.4rem 1rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 100px;
          backdrop-filter: blur(4px);
          margin-bottom: 1rem;
        }

        .project-card__title {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-white);
          line-height: 1.1;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-card__title {
          transform: translateX(8px);
        }
        
        .project-card__year {
          font-size: 0.875rem;
          color: var(--color-gray);
          margin-top: 0.5rem;
        }

        .project-card.large {
          grid-column: span 2;
        }
        
        .project-card.large .project-card__title {
          font-size: clamp(2rem, 4vw, 3.5rem);
        }

        @media (max-width: 768px) {
          .project-card.large {
            grid-column: span 1;
          }
          
          .project-card__overlay {
            padding: 1.5rem;
          }
        }
      `}</style>
    </Link>
  );
}

