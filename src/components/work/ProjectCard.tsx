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

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
        });

        // Parallax on image
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                x: (x - centerX) / 10,
                y: (y - centerY) / 10,
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
    const aspectRatio = isLarge ? '4/5' : '3/4';

    return (
        <Link
            ref={cardRef}
            href={`/work/${project.slug}`}
            className={`project-card ${isLarge ? 'large' : ''}`}
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

                {/* Overlay */}
                <div className={`project-card__overlay ${isHovered ? 'active' : ''}`} />
            </div>

            <div className="project-card__content">
                <div className="project-card__tags">
                    {project.tags.map((tag) => (
                        <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                </div>
                <h3 className="project-card__title">{project.title}</h3>
            </div>

            <style jsx>{`
        .project-card {
          display: block;
          text-decoration: none;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .project-card__image {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          transform: translateZ(20px);
        }

        .project-card__placeholder {
          position: absolute;
          inset: 0;
          transition: transform 0.5s var(--transition-smooth);
        }

        .project-card:hover .project-card__placeholder {
          transform: scale(1.05);
        }

        .project-card__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card__overlay.active {
          opacity: 1;
        }

        .project-card__content {
          padding: 1.5rem 0;
          transform: translateZ(30px);
        }

        .project-card__tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .project-card__tag {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gray);
        }

        .project-card__title {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--color-white);
          transition: color 0.3s ease;
        }

        .project-card:hover .project-card__title {
          color: var(--color-accent);
        }

        .project-card.large {
          grid-column: span 2;
        }

        @media (max-width: 768px) {
          .project-card.large {
            grid-column: span 1;
          }
        }
      `}</style>
        </Link>
    );
}
