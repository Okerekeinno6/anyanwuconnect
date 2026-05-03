"use client";

import { useState, useEffect } from 'react';
import styles from '@/app/page.module.css';

const images = [
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=85', // African executives in boardroom
  'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=1600&q=85', // African community development
  'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=1600&q=85', // African leadership conference
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Crossfade every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroBackground}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Hero Background ${index + 1}`}
          className={`${styles.heroImage} ${index === currentIndex ? styles.heroImageActive : ''}`}
        />
      ))}
    </div>
  );
}
