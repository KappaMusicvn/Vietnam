
import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            if (dotRef.current) {
                dotRef.current.style.left = `${clientX}px`;
                dotRef.current.style.top = `${clientY}px`;
            }
            if (outlineRef.current) {
                outlineRef.current.style.left = `${clientX}px`;
                outlineRef.current.style.top = `${clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block"></div>
            <div ref={outlineRef} className="cursor-outline hidden md:block"></div>
        </>
    );
};

export default Cursor;
