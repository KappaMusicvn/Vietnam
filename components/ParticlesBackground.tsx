
import React, { useEffect } from 'react';

declare global {
    interface Window {
        particlesJS: any;
    }
}

const ParticlesBackground: React.FC = () => {
    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 2, random: true },
                    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out' }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
                }
            });
        }
    }, []);

    return <div id="particles-js" className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default React.memo(ParticlesBackground);
