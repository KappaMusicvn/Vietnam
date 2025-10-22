
import React, { useState } from 'react';
import type { NavLinkData } from '../types';

interface MobileNavProps {
    navLinks: NavLinkData[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navLinks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden fixed top-0 left-0 w-full z-50">
            <div className="bg-nav-bg backdrop-blur-lg flex justify-between items-center p-4 shadow-md">
                <a href="#home" className="text-xl font-bold animated-gradient-text">Khám Phá Việt Nam</a>
                <button onClick={toggleMenu} className="z-50" aria-label="Toggle menu">
                    <div className="w-6 h-6 flex flex-col justify-around">
                        <span className={`block w-full h-0.5 bg-text-color transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-text-color transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-text-color transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>
            <div className={`fixed top-0 left-0 h-full w-64 bg-nav-bg backdrop-blur-xl shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <nav className="mt-20 flex flex-col space-y-4 p-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10"
                        >
                            <div style={{ color: link.color }}>{link.icon}</div>
                            <span>{link.tooltip}</span>
                        </a>
                    ))}
                </nav>
            </div>
             {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-[-1]"></div>}
        </div>
    );
};

export default MobileNav;
