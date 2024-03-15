import { useEffect, useState, RefObject } from "react";

const useVisibilityObserver = (ref: RefObject<HTMLElement>): boolean => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log('Image is now visible:', entry.target);
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.7 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [ref]);
    return isVisible;
}

export default useVisibilityObserver;