import { useEffect, useState } from "react";
import { Photo } from '../types/Photo';
import { PexelsResponse } from '../types/PexelsResponse';
import usePagination from "./usePagination";

const useFetchData = (): { fetchedImages: Photo[], error: string | null } => {
    const [fetchedImages, setFetchedImages] = useState<Photo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const page = usePagination();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setError(null);
            try {
                console.log('page: ', page);
                const perPage = (page === 1) ? 9 : 6;
                const response = await fetch(
                    `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
                    {
                        method: 'GET',
                        headers: { Authorization: process.env.REACT_APP_PEXELS_API_KEY || '' },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: PexelsResponse = await response.json();
                if (data && data.photos) {
                    console.log(data.photos);
                    if (page === 1) {
                        setFetchedImages(data.photos);
                    } else {
                        setFetchedImages((prevFetchedImages) => {
                            const oldAndNewImages = [...prevFetchedImages, ...data.photos];
                            const idsSet = new Set();
                            return oldAndNewImages.filter(element => !idsSet.has(element.id) && idsSet.add(element.id));
                        });
                    }
                }
            } catch (error) {
                setError('Failed to fetch images. Please try again.');
                console.error('Error fetching image:', error);
            }
        };
        fetchData();
    }, [page]);

    return { fetchedImages, error };
};

export default useFetchData;
