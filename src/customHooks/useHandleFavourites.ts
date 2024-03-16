import { useEffect, useState } from "react";
import { Photo } from '../types/Photo';

const useHandleFavourites = () => {
    const [favouritedImages, setFavouritedImages] = useState<Photo[]>(() => {
        const storedImages = localStorage.getItem('favouritedImages');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    useEffect(() => {
        localStorage.setItem('favouritedImages', JSON.stringify(favouritedImages));
    }, [favouritedImages]);

    const addImage = (newImage: Photo): void => {
        setFavouritedImages(prevImages => [...prevImages, newImage]);
    }

    const removeImage = (imageIdToRemove: number): void => {
        setFavouritedImages(prevImages => prevImages.filter(img => img.id !== imageIdToRemove));
    }

    return { favouritedImages, addImage, removeImage };
}

export default useHandleFavourites;