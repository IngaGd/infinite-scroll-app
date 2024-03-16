import { useEffect, useState, RefObject } from "react";

const useIntersectionObserver = (ref: RefObject<HTMLElement>, threshold: number): boolean => {
    const [isObserved, setIsObserved] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log('Image is now observed:', entry.target);
                        setIsObserved(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [ref, threshold]);
    return isObserved;
}

export default useIntersectionObserver;