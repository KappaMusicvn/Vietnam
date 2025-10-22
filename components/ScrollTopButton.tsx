
import React, { useState, useEffect } from 'react';

const ScrollTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            id="scrollTopBtn"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-40 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-500 focus:outline-none transition-opacity transform-gpu duration-300 hover:scale-110 hover:-rotate-12 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollTopButton;
