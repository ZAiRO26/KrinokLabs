'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useStore } from '@/store/useStore';

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLDivElement>(null);
    const { cursorState } = useStore();

    const position = useRef({ x: 0, y: 0 });
    const delayedPosition = useRef({ x: 0, y: 0 });

    const moveCursor = useCallback((e: MouseEvent) => {
        position.current = { x: e.clientX, y: e.clientY };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', moveCursor);

        // Smooth cursor animation
        const animate = () => {
            delayedPosition.current.x += (position.current.x - delayedPosition.current.x) * 0.15;
            delayedPosition.current.y += (position.current.y - delayedPosition.current.y) * 0.15;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${delayedPosition.current.x}px, ${delayedPosition.current.y}px, 0)`;
            }

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [moveCursor]);

    // Cursor state changes with GSAP
    useEffect(() => {
        if (!cursorRef.current) return;

        switch (cursorState) {
            case 'hover':
                gsap.to(cursorRef.current, {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                break;
            case 'view':
                gsap.to(cursorRef.current, {
                    scale: 2,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (cursorTextRef.current) {
                    gsap.to(cursorTextRef.current, {
                        opacity: 1,
                        duration: 0.2,
                    });
                }
                break;
            default:
                gsap.to(cursorRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (cursorTextRef.current) {
                    gsap.to(cursorTextRef.current, {
                        opacity: 0,
                        duration: 0.2,
                    });
                }
        }
    }, [cursorState]);

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className="cursor-ring"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate3d(0, 0, 0)',
                    marginLeft: '-20px',
                    marginTop: '-20px',
                    mixBlendMode: 'difference',
                }}
            >
                <div
                    ref={cursorTextRef}
                    className="cursor-text"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        color: '#fff',
                        opacity: 0,
                        whiteSpace: 'nowrap',
                    }}
                >
                    VIEW
                </div>
            </div>

            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="cursor-dot"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'translate3d(0, 0, 0)',
                    marginLeft: '-3px',
                    marginTop: '-3px',
                    mixBlendMode: 'difference',
                }}
            />
        </>
    );
}
