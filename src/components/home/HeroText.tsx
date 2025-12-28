'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroTextProps {
    text: string;
    className?: string;
}

export default function HeroText({ text, className = '' }: HeroTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // Split text into characters
        const chars = text.split('');
        textRef.current.innerHTML = chars
            .map((char, index) => {
                if (char === ' ') {
                    return '<span class="char space">&nbsp;</span>';
                }
                return `<span class="char" style="display: inline-block">${char}</span>`;
            })
            .join('');

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
                style={{
                    fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    perspective: '1000px',
                }}
            >
                {text}
            </h1>
        </div>
    );
}
