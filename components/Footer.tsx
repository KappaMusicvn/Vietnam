
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="relative w-full py-8 px-4 sm:px-8 text-center bg-black/50 backdrop-blur-sm text-text-color/60 z-20">
            <div className="max-w-6xl mx-auto">
                <p>&copy; {currentYear} Khám Phá Việt Nam. All Rights Reserved.</p>
                <p className="mt-2 text-sm">Một sản phẩm demo được tạo với React, TailwindCSS, và Google Gemini AI.</p>
            </div>
        </footer>
    );
};

export default Footer;
