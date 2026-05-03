"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/pillars', label: 'Our Pillars' },
  { href: '/impact', label: 'Our Impact' },
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];



export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} glass`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logoWrapper} aria-label="AnyanwuConnect Home">
            <img src="/logo.jpeg" alt="AnyanwuConnect Logo" className={styles.logoImage} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>AnyanwuConnect</span>
              <span className={styles.logoTagline}>Development Architect</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.linkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
              Partner With Us
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`} />
          </button>
        </div>
      </header>
    </>
  );
}
