import React, { useRef, useEffect } from 'react';
import type { SectionData } from '../../types';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TypedHeadline from '../TypedHeadline';

interface HeroProps extends SectionData {}

const HeroSection: React.FC<HeroProps> = ({ title }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.4 });
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoUrl = 'https://cdn.coverr.co/videos/coverr-a-beautiful-aerial-shot-of-a-coastline-4195/1080p.mp4';

    useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
        }
    }, [isVisible]);

    return (
        <>
            <video
                ref={videoRef}
                key={videoUrl}
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                loop
                muted
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div ref={ref} className="content-container relative z-10">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <TypedHeadline />
                    <p className="mt-4 text-xl md:text-2xl font-light transition-all duration-700 delay-200 transform-gpu"
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