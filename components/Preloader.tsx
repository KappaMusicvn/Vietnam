
import React from 'react';

interface PreloaderProps {
    isLoaded: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoaded }) => {
    return (
        <div
            id="preloader"
            className={`fixed top-0 left-0 w-full h-screen bg-stone-950 z-[10000] flex justify-center items-center transition-opacity duration-1000 ease-out ${
                isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="loader-spinner"></div>
        </div>
    );
};

export default Preloader;
