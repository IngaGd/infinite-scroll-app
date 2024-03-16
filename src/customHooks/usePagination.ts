import { useEffect, useState } from "react"
import useSrollToBottom from "./useSrollToBottom";

const usePagination = (): number => {
    const [page, setPage] = useState<number>(1);
    const scrolledToBottom = useSrollToBottom();

    useEffect(() => {
        if (scrolledToBottom) {
            setPage(p => p + 1);
        }
    }, [scrolledToBottom]);

    return page;
}
export default usePagination;