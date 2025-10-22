
import React, { useState, useRef } from 'react';
import type { SectionData, GalleryItem } from '../../types';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface GallerySectionProps extends SectionData {
    onImageClick: (src: string) => void;
}

const TiltableImage: React.FC<{ item: GalleryItem, onImageClick: (src: string) => void }> = ({ item, onImageClick }) => {
    const groupRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!groupRef.current) return;
        const rect = groupRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        groupRef.current.style.setProperty('--rotateX', `${(y / rect.height) * -12}deg`);
        groupRef.current.style.setProperty('--rotateY', `${(x / rect.width) * 12}deg`);
    };

    const handleMouseLeave = () => {
        if (!groupRef.current) return;
        groupRef.current.style.setProperty('--rotateX', '0deg');
        groupRef.current.style.setProperty('--rotateY', '0deg');
    };

    return (
        <div 
            ref={groupRef} 
            className="group relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300 [transform-style:preserve-3d] hover:shadow-current/50" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave} 
            style={{ color: 'var(--primary-color)' }}
        >
            <img 
                src={item.src} 
                alt={item.alt} 
                onClick={() => onImageClick(item.src)} 
                className="gallery-item cursor-pointer w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                style={{ transform: 'perspective(1000px) rotateY(var(--rotateY, 0)) rotateX(var(--rotateX, 0))' }}
                loading="lazy" 
                decoding="async" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white text-xl font-bold text-center drop-shadow-lg">{item.title}</span>
            </div>
        </div>
    );
};

const ReadMore: React.FC<{ targetId: string, children: React.ReactNode }> = ({ targetId, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="font-semibold ml-2 transition-colors duration-300 hover:underline focus:outline-none" style={{ color: 'var(--primary-color)' }}>
                {isOpen ? '[Thu gọn]' : '[Xem chi tiết]'}
            </button>
            <div id={targetId} className={`more-text text-left text-base font-light text-white/80 ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </>
    );
};

const GallerySection: React.FC<GallerySectionProps> = ({ title, subtitle, readMore, readMoreId, videoBackground, gallery, onImageClick }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    const videoRef = useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (isVisible && videoRef.current) {
            videoRef.current.play().catch(error => console.log("Autoplay prevented:", error));
        }
    }, [isVisible]);

    return (
        <>
            {videoBackground && (
                <video
                    ref={videoRef}
                    key={videoBackground}
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    loop
                    muted
                    playsInline
                >
                    <source src={videoBackground} type="video/mp4" />
                </video>
            )}
            <div className="absolute inset-0 bg-black/70"></div>
            <div ref={ref} className={`content-container relative z-10 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-card-bg backdrop-blur-xl border border-border-color rounded-2xl p-6 sm:p-10 shadow-2xl">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 animated-gradient-text transition-all duration-700 delay-100" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, fontFamily: "'Playfair Display', serif" }}>{title}</h2>
                    <div className="text-lg text-gray-200 dark:text-gray-200 mb-10 transition-all duration-700 delay-300" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0 }}>
                        <span className="text-inherit">{subtitle}
                            {readMore && readMoreId && <ReadMore targetId={readMoreId}>{readMore}</ReadMore>}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-500" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0 }}>
                        {gallery?.map((item, index) => (
                           <TiltableImage key={index} item={item} onImageClick={onImageClick} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GallerySection;
