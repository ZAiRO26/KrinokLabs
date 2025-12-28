'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
    text: string;
    direction?: 'left' | 'right';
    speed?: number;
}

export default function Marquee({
    text,
    direction = 'left',
    speed = 1
}: MarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !textRef.current) return;

        // Duplicate text for seamless loop
        const textWidth = textRef.current.offsetWidth;

        // Scroll-triggered horizontal movement
        gsap.to(textRef.current, {
            x: direction === 'left' ? -textWidth / 2 : textWidth / 2,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: speed,
            },
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="marquee-container">
            <div ref={textRef} className="marquee-content">
                <span className="marquee-text">{text}</span>
                <span className="marquee-separator">—</span>
                <span className="marquee-text">{text}</span>
                <span className="marquee-separator">—</span>
                <span className="marquee-text">{text}</span>
                <span className="marquee-separator">—</span>
            </div>

            <style jsx>{`
                .marquee-container {
                    overflow: hidden;
                    padding: 4rem 0;
                    position: relative;
                }
                
                .marquee-content {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    white-space: nowrap;
                    will-change: transform;
                }
                
                .marquee-text {
                    font-size: clamp(6rem, 15vw, 15rem);
                    font-weight: 700;
                    letter-spacing: -0.04em;
                    text-transform: uppercase;
                    color: transparent;
                    -webkit-text-stroke: 1px var(--color-gray);
                    opacity: 0.3;
                    transition: opacity 0.3s ease;
                }
                
                .marquee-separator {
                    font-size: clamp(4rem, 10vw, 10rem);
                    color: var(--color-gray);
                    opacity: 0.2;
                }
                
                .marquee-container:hover .marquee-text {
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
}
