
import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        Typed: any;
    }
}

const TypedHeadline: React.FC = () => {
    const el = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (el.current && window.Typed) {
            const typed = new window.Typed(el.current, {
                strings: ['Việt Nam', 'Khám Phá', 'Trải Nghiệm'],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
            });
            return () => {
                typed.destroy();
            };
        }
    }, []);

    return (
        <h1
            ref={el}
            className="text-6xl md:text-8xl font-black uppercase tracking-wider text-white animated-gradient-text"
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.7)' }}
        ></h1>
    );
};

export default TypedHeadline;
