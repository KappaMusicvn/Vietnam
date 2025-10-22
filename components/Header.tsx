import React from 'react';
import type { SectionName, NavLinkData } from '../types';

interface HeaderProps {
    navLinks: NavLinkData[];
    activeSection: SectionName;
}

const Header: React.FC<HeaderProps> = ({ navLinks, activeSection }) => {
    return (
        <header className="fixed top-0 right-0 h-screen w-20 bg-nav-bg backdrop-blur-lg z-40 hidden md:flex flex-col items-center justify-center space-y-5 shadow-lg border-l border-border-color transition-colors duration-500">
            {navLinks.map((link) => (
                <a
                    key={link.id}
                    href={link.href}
                    aria-label={link.tooltip}
                    className={`nav-link group relative flex items-center justify-center w-12 h-12 rounded-full text-gray-400 transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-white ${
                        activeSection === link.id ? 'scale-110 shadow-lg' : 'scale-90'
                    }`}
                    style={activeSection === link.id ? { backgroundColor: link.color, color: 'white', boxShadow: `0 0 15px ${link.color}80` } : {}}
                >
                    {link.icon}
                    <span className="nav-tooltip absolute right-full top-1/2 -translate-y-1/2 mr-5 px-4 py-2 bg-white text-gray-800 rounded-md font-semibold shadow-md opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50">
                        {link.tooltip}
                    </span>
                </a>
            ))}
        </header>
    );
};

export default React.memo(Header);