
import React, { useEffect, useRef } from 'react';
import { sectionsData } from '../../data/content';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

declare global {
    interface Window {
        L: any;
    }
}

const InteractiveMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const isMapInitialized = useRef(false);
    const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        if (!isVisible || !mapRef.current || isMapInitialized.current || typeof window.L === 'undefined') {
            return;
        }
        
        const map = window.L.map(mapRef.current).setView([16.0, 108.0], 5);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        sectionsData.forEach(section => {
            if (section.coordinates) {
                const marker = window.L.marker(section.coordinates).addTo(map);
                marker.bindPopup(`<b>${section.title}</b>`).on('click', () => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                });
            }
        });

        isMapInitialized.current = true;

    }, [isVisible]);

    return (
        <section id="map" ref={containerRef} className="min-h-screen w-full relative flex items-center justify-center text-center p-4 sm:p-8 overflow-hidden bg-card-bg">
            <div className={`content-container relative z-10 w-full max-w-6xl mx-auto transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-card-bg backdrop-blur-xl border border-border-color rounded-2xl p-6 sm:p-10 shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 animated-gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>Bản Đồ Tương Tác</h2>
                    <p className="mb-8 text-text-color/80">Khám phá các địa điểm nổi bật trên bản đồ Việt Nam.</p>
                    <div ref={mapRef} className="h-[60vh] w-full rounded-lg z-10 shadow-inner"></div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
