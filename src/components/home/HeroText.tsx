'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
    text: string;
    className?: string;
    serifWords?: string[]; // Words to style with serif font
}

export default function HeroText({ text, className = '', serifWords = ['BREATHTAKING'] }: HeroTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // Split text into words first, then characters
        const words = text.split(' ');

        textRef.current.innerHTML = words
            .map((word) => {
                const isSerifWord = serifWords.some(sw => word.toUpperCase().includes(sw.toUpperCase()));
                const wordClass = isSerifWord ? 'word serif-word' : 'word';

                const chars = word.split('').map((char) => {
                    return `<span class="char" style="display: inline-block">${char}</span>`;
                }).join('');

                return `<span class="${wordClass}">${chars}</span>`;
            })
            .join('<span class="char space">&nbsp;</span>');

        const charElements = textRef.current.querySelectorAll('.char');

        // Initial animation - letters fly in from bottom
        gsap.set(charElements, {
            y: 120,
            opacity: 0,
            rotationX: -90,
        });

        gsap.to(charElements, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.02,
            duration: 1.2,
            delay: 0.8,
            ease: 'power4.out',
        });

        // Parallax on scroll - text moves faster than background
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const yOffset = self.progress * 200;

                gsap.to(textRef.current, {
                    y: yOffset,
                    duration: 0.5,
                    ease: 'power2.out',
                });

                // Add slight skew based on scroll velocity
                const skewAmount = Math.min(Math.max(velocity / 500, -5), 5);
                gsap.to(charElements, {
                    skewY: skewAmount,
                    duration: 0.3,
                });
            },
        });

        // Reset skew when scroll stops
        ScrollTrigger.create({
            trigger: containerRef.current,
            onLeave: () => {
                gsap.to(charElements, {
                    skewY: 0,
                    duration: 0.5,
                });
            },
            onEnterBack: () => {
                gsap.to(charElements, {
                    skewY: 0,
                    duration: 0.5,
                });
            },
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            <h1
                ref={textRef}
                className="hero-text"
            >
                {text}
            </h1>

            <style jsx>{`
                .hero-text {
                    font-size: clamp(2.5rem, 10vw, 8rem);
                    font-weight: 700;
                    letter-spacing: -0.04em;
                    line-height: 0.95;
                    text-transform: uppercase;
                    text-align: center;
                    perspective: 1000px;
                }
                
                .hero-text :global(.word) {
                    display: inline-block;
                    white-space: nowrap;
                }
                
                .hero-text :global(.serif-word) {
                    font-family: 'Playfair Display', var(--font-serif), Georgia, serif;
                    font-style: italic;
                    font-weight: 400;
                    text-transform: lowercase;
                }
                
                .hero-text :global(.serif-word .char) {
                    text-transform: lowercase;
                }
            `}</style>
        </div>
    );
}

