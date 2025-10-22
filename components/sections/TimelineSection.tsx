
import React, { useState } from 'react';
import type { SectionData, TimelineItemData } from '../../types';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const TimelineItem: React.FC<{ item: TimelineItemData, isVisible: boolean }> = ({ item, isVisible }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="timeline-item py-8">
            <div className={`timeline-icon absolute w-12 h-12 left-1/2 top-1/2 bg-card-bg backdrop-blur-sm border-4 border-gray-600 rounded-full z-10 flex items-center justify-center transition-all duration-500 ease-out`}
                style={{
                    color: 'var(--primary-color)', 
                    transform: isVisible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: isVisible ? '0 0 20px var(--primary-color)' : 'none',
                    borderColor: isVisible ? 'var(--primary-color)' : '#4b5563'
                }}>
                {item.icon}
            </div>
            <div className={`timeline-content relative bg-card-bg backdrop-blur-xl border border-border-color rounded-lg w-[45%] text-left overflow-hidden transition-all duration-700 ease-out even:left-[55%] odd:left-0`}
                style={{
                    transform: isVisible ? 'translateY(0) rotate(0)' : 'translateY(50px) rotate(3deg)',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: isVisible ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
                }}>
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" loading="lazy" decoding="async" />
                <div className="p-4">
                    <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--primary-color)' }}>{item.date}</h3>
                    <p>{item.title}
                        <button onClick={() => setIsOpen(!isOpen)} className="font-semibold cursor-pointer ml-2 transition-colors duration-300 hover:underline focus:outline-none" style={{ color: 'var(--primary-color)' }}>
                            {isOpen ? '[Thu gọn]' : '[Xem chi tiết]'}
                        </button>
                    </p>
                    <div id={item.id} className={`more-text text-left text-base font-light text-text-color/80 ${isOpen ? 'open' : ''}`}>
                        {item.details}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineSection: React.FC<SectionData> = ({ title, timeline }) => {
    const [containerRef, isContainerVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <div ref={containerRef} className={`content-container relative z-10 w-full transition-opacity duration-700 ${isContainerVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-bold mb-16 animated-gradient-text transition-all duration-700" style={{ transform: isContainerVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isContainerVisible ? 1 : 0, fontFamily: "'Playfair Display', serif" }}>
                {title}
            </h2>
            <div id="timeline" className="timeline-container max-w-3xl mx-auto relative">
                {timeline?.map((item) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.6, rootMargin: '0px 0px -100px 0px' });
                    return (
                        <div key={item.id} ref={ref}>
                            <TimelineItem item={item} isVisible={isVisible} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default TimelineSection;
