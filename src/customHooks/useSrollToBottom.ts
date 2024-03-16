import { useEffect, useState } from "react";

const useSrollToBottom = (): boolean => {
    const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
            if (isAtBottom) {
                console.log('You are at the bottom!');
            }
            setScrolledToBottom(isAtBottom);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return scrolledToBottom;
};

export default useSrollToBottom;
