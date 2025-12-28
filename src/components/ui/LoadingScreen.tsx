'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useStore } from '@/store/useStore';

export default function LoadingScreen() {
    const { isLoading, setLoading } = useStore();
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Animate out after content loads
        const timer = setTimeout(() => {
            gsap.to('.loading-screen', {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                duration: 0.8,
                ease: 'power4.inOut',
                onComplete: () => {
                    setLoading(false);
                    setShow(false);
                },
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [setLoading]);

    if (!show) return null;

    return (
        <div
            className="loading-screen"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-black)',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
        >
            <div className="loading-content">
                <div
                    className="loading-logo"
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        color: 'var(--color-white)',
                    }}
                >
                    KRINOK
                </div>
                <div
                    className="loading-bar"
                    style={{
                        width: '150px',
                        height: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        marginTop: '2rem',
                        overflow: 'hidden',
                        borderRadius: '1px',
                    }}
                >
                    <div
                        className="loading-progress"
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'var(--color-accent)',
                            animation: 'loadingProgress 1.2s ease-in-out forwards',
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
        @keyframes loadingProgress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .loading-logo {
          animation: pulse 1s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          from {
            opacity: 0.7;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
