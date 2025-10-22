import React, { useState, useEffect } from 'react';
import type { SectionData } from '../../types';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TypedHeadline from '../TypedHeadline';

interface HeroProps extends SectionData {}

const backgroundImages = [
    'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop', // Hoi An
    'https://images.unsplash.com/photo-1595825223706-5c5a87b69333?q=80&w=2070&auto=format&fit=crop', // Ha Long Bay
    'https://images.unsplash.com/photo-1534214526114-0ea5d21a11da?q=80&w=2070&auto=format&fit=crop', // Sapa
    'https://images.unsplash.com/photo-1583417319070-4a69db38a430?q=80&w=2070&auto=format&fit=crop'  // Mekong Delta
];


const HeroSection: React.FC<HeroProps> = ({ title }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.4 });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Image slider effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {/* Background Image Slider with Ken Burns Effect */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-black">
                {backgroundImages.map((src, index) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Vietnam landscape ${index + 1}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out`}
                        style={{
                            opacity: index === currentImageIndex ? 1 : 0,
                            transform: index === currentImageIndex ? 'scale(1.15)' : 'scale(1)',
                            transition: 'transform 7s ease-out, opacity 2s ease-in-out',
                        }}
                    />
                ))}
            </div>
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div ref={ref} className="content-container relative z-10">
                 {/* Glassmorphism container for text content */}
                <div className={`transition-all duration-1000 ease-out bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <TypedHeadline />
                    <p className="mt-4 text-xl md:text-2xl font-light transition-all duration-700 delay-200"
                        style={{ opacity: isVisible ? 1: 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                        {title}
                    </p>
                    <div className="mt-12 space-x-4 transition-all duration-700 delay-500"
                        style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
                        <a href="#north" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg uppercase shadow-lg hover:bg-blue-500 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                            Khám phá ngay
                        </a>
                    </div>
                </div>
            </div>
            
            <div className={`scroll-down-arrow absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </>
    );
};

export default HeroSection;
