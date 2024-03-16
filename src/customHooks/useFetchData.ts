import { useEffect, useState } from "react";
import { Photo } from '../types/Photo';
import { PexelsResponse } from '../types/PexelsResponse';
import usePagination from "./usePagination";

const useFetchData = (): Photo[] => {
    const [fetchedImages, setFetchedImages] = useState<Photo[]>([]);
    const page = usePagination();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
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

                            const uniqueIdsSet = new Set();
                            const uniqueImages = [];

                            for (const img of oldAndNewImages) {
                                if (!uniqueIdsSet.has(img.id)) {
                                    uniqueIdsSet.add(img.id);
                                    uniqueImages.push(img);
                                }
                            }
                            return uniqueImages;
                        });
                    }
                }
            } catch (error) {
                console.error('error fetching image:', error);
            }
        };
        fetchData();
    }, [page]);

    return fetchedImages;
};

export default useFetchData;
