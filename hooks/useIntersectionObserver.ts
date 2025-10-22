
import { useState, useEffect, useRef, MutableRefObject } from 'react';

type ObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
};

const useIntersectionObserver = (options: ObserverOptions): [MutableRefObject<any>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optional: unobserve after it's visible so it doesn't trigger again
                    // observer.unobserve(entry.target);
                }
            },
            {
                threshold: options.threshold || 0.1,
                root: options.root || null,
                rootMargin: options.rootMargin || '0px',
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options.threshold, options.root, options.rootMargin]);

    return [elementRef, isVisible];
};

export default useIntersectionObserver;
