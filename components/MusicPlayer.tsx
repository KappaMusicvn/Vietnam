import React, { useState, useRef, useEffect, useCallback } from 'react';

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = useCallback(async () => {
        if (!audioRef.current) return;
        try {
            if (audioRef.current.paused) {
                await audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        } catch (error) {
            console.error("Audio playback failed:", error);
        }
    }, []);
    
    useEffect(() => {
        const startMusicOnFirstInteraction = async () => {
            if (audioRef.current && audioRef.current.paused) {
                 try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay was prevented. User needs to click the music button.");
                }
            }
            // Clean up listeners after first interaction
            document.body.removeEventListener('mousedown', startMusicOnFirstInteraction);
            // FIX: Correctly remove the scroll event listener.
            document.body.removeEventListener('scroll', startMusicOnFirstInteraction);
        };
    
        // FIX: Removed { once: true } to prevent TypeScript error and rely on manual listener removal.
        document.body.addEventListener('mousedown', startMusicOnFirstInteraction);
        document.body.addEventListener('scroll', startMusicOnFirstInteraction);

        return () => {
            document.body.removeEventListener('mousedown', startMusicOnFirstInteraction);
            document.body.removeEventListener('scroll', startMusicOnFirstInteraction);
        };
    }, []);

    return (
        <>
            <audio id="bg-music" ref={audioRef} loop>
                <source src="https://www.chosic.com/wp-content/uploads/2021/07/purrple-cat-wondering.mp3" type="audio/mpeg" />
            </audio>
            <button
                id="music-toggle"
                onClick={togglePlay}
                className="fixed bottom-8 left-8 z-40 bg-gray-800 bg-opacity-70 backdrop-blur-sm text-white rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
            >
                {isPlaying ? (
                     <svg className="pause-icon h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (
                     <svg className="play-icon h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )}
            </button>
        </>
    );
};

export default MusicPlayer;