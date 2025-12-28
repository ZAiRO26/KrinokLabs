'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const { isMenuOpen, toggleMenu, setCursorState } = useStore();
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (!menuRef.current) return;

        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 0.6,
                ease: 'power4.inOut',
            });

            gsap.from(linksRef.current, {
                y: 80,
                opacity: 0,
                stagger: 0.1,
                delay: 0.3,
                duration: 0.5,
                ease: 'power3.out',
            });
        } else {
            gsap.to(menuRef.current, {
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                duration: 0.4,
                ease: 'power4.inOut',
            });
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* Fixed Header */}
            <header className="header">
                <div className="header__inner">
                    <Link
                        href="/"
                        className="header__logo"
                        onMouseEnter={() => setCursorState('hover')}
                        onMouseLeave={() => setCursorState('default')}
                    >
                        KRINOK
                    </Link>

                    <button
                        className="header__menu-btn"
                        onClick={toggleMenu}
                        onMouseEnter={() => setCursorState('hover')}
                        onMouseLeave={() => setCursorState('default')}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                            <span className="hamburger__line"></span>
                            <span className="hamburger__line"></span>
                        </span>
                    </button>
                </div>
            </header>

            {/* Fullscreen Menu */}
            <div
                ref={menuRef}
                className="menu"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                }}
            >
                <nav className="menu__nav">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            ref={(el) => { linksRef.current[index] = el; }}
                            href={link.href}
                            className="menu__link"
                            onClick={() => toggleMenu()}
                            onMouseEnter={() => setCursorState('hover')}
                            onMouseLeave={() => setCursorState('default')}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="menu__footer">
                    <div className="menu__contact">
                        <a href="mailto:hello@krinok.com">hello@krinok.com</a>
                        <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </div>
                    <div className="menu__social">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a>
                    </div>
                </div>
            </div>

            <style jsx>{`
              @media (max-width: 768px) {
                :global(.menu) {
                  padding: 5rem 1.5rem 2rem !important;
                  justify-content: flex-start !important;
                  overflow-y: auto !important;
                }
                
                :global(.menu__link) {
                  font-size: clamp(2rem, 8vw, 3rem) !important;
                }
                
                :global(.menu__footer) {
                  position: relative !important;
                  bottom: auto !important;
                  left: auto !important;
                  right: auto !important;
                  flex-direction: column !important;
                  gap: 1rem !important;
                  margin-top: auto !important;
                  padding-top: 2rem !important;
                }
                
                :global(.menu__contact),
                :global(.menu__social) {
                  flex-wrap: wrap !important;
                  gap: 0.75rem !important;
                }
              }
            `}</style>
        </>
    );
}
