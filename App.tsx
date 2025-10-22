import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { navLinks, sectionsData } from './data/content';
import type { SectionName } from './types';

// Import Components
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Section from './components/Section';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import ParticlesBackground from './components/ParticlesBackground';
import ImageModal from './components/ImageModal';
import ScrollTopButton from './components/ScrollTopButton';
import MusicPlayer from './components/MusicPlayer';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import InteractiveMap from './components/map/InteractiveMap';


const App: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState<SectionName>('home');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    const handleImageClick = (src: string) => {
        setSelectedImage(src);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };
    
    // Theme logic
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);

    // Load external scripts
    useEffect(() => {
        const loadScript = (src: string, id: string, onLoad?: () => void) => {
            if (document.getElementById(id)) {
                onLoad?.();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.async = true;
            script.onload = () => onLoad?.();
            document.body.appendChild(script);
        };
        
        loadScript("https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js", "particles-js-script");
        loadScript("https://cdn.jsdelivr.net/npm/typed.js@2.0.12", "typed-js-script");
        loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", "leaflet-js-script");

    }, []);

    // Page loader
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Intersection observer for active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id as SectionName);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [isLoaded]);


    return (
        <div className={`app-container ${theme}`}>
            <Preloader isLoaded={isLoaded} />
            <Cursor />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <Header navLinks={navLinks} activeSection={activeSection} />
            <MobileNav navLinks={navLinks} />
            <ParticlesBackground />
            <MusicPlayer />
            <ScrollTopButton />
            <ImageModal src={selectedImage} onClose={closeModal} />
            
            <main id="main-content">
                {sectionsData.map((section, index) => {
                    const Component = section.component;
                    const props: any = { ...section, onImageClick: handleImageClick };
                    
                    if (section.id === 'map') {
                        // These are self-contained sections, wrap to get ref
                        return (
                            <div key={section.id} ref={(el) => { sectionRefs.current[index] = el; }} id={section.id}>
                                <InteractiveMap />
                            </div>
                        )
                    }

                    return (
                        <Section 
                            key={section.id}
                            id={section.id}
                            style={{'--primary-color': navLinks.find(l => l.id === section.id)?.color || '#ffffff'} as React.CSSProperties}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                        >
                            <Component {...props} />
                        </Section>
                    );
                })}
                <Footer />
            </main>
        </div>
    );
};

export default App;