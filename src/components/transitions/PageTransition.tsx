'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useStore } from '@/store/useStore';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isTransitioning, setTransitioning } = useStore();
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [displayChildren, setDisplayChildren] = useState(children);
    const isFirstMount = useRef(true);

    useEffect(() => {
        // Skip animation on first mount
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        // Trigger page transition
        if (!overlayRef.current || !textRef.current) return;

        const tl = gsap.timeline({
            onStart: () => setTransitioning(true),
            onComplete: () => setTransitioning(false),
        });

        // Phase 1: Cover screen with overlay
        tl.set(overlayRef.current, {
            display: 'flex',
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        })
            .to(overlayRef.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 0.5,
                ease: 'power4.inOut',
            })
            // Phase 2: Type out "HELLO"
            .call(() => {
                if (textRef.current) {
                    const chars = 'HELLO'.split('');
                    textRef.current.innerHTML = '';
                    chars.forEach((char, i) => {
                        setTimeout(() => {
                            if (textRef.current) {
                                textRef.current.innerHTML += `<span>${char}</span>`;
                            }
                        }, i * 80);
                    });
                }
            })
            .to({}, { duration: 0.5 }) // Wait for typing
            // Phase 3: Update children
            .call(() => {
                setDisplayChildren(children);
            })
            // Phase 4: Reveal new page
            .to(overlayRef.current, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                duration: 0.6,
                ease: 'power4.inOut',
                delay: 0.2,
            })
            .set(overlayRef.current, { display: 'none' });

    }, [pathname, children, setTransitioning]);

    return (
        <>
            {displayChildren}

            {/* Transition Overlay */}
            <div
                ref={overlayRef}
                className="page-transition-overlay"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9998,
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-accent)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                }}
            >
                <div
                    ref={textRef}
                    className="transition-text"
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 10rem)',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'var(--color-black)',
                        fontFamily: 'var(--font-primary)',
                    }}
                />
            </div>

            <style jsx global>{`
        .transition-text span {
          display: inline-block;
          animation: charReveal 0.3s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes charReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}
