
import React from 'react';

interface ImageModalProps {
    src: string | null;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
    if (!src) return null;

    return (
        <div
            id="imageModal"
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out animate-fade-in"
        >
            <img
                id="modalImage"
                src={src}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()} 
            />
            <button
                id="closeModal"
                onClick={onClose}
                className="absolute top-6 right-6 text-white text-5xl font-bold opacity-80 hover:opacity-100"
            >
                &times;
            </button>
        </div>
    );
};

export default ImageModal;
