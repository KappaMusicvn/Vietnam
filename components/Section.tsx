
import React, { forwardRef } from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, className = '', children, style }, ref) => {
    return (
        <section
            id={id}
            ref={ref}
            className={`min-h-screen w-full relative flex items-center justify-center text-center p-4 sm:p-8 overflow-hidden ${className}`}
            style={style}
        >
            {children}
        </section>
    );
});

export default Section;
