import { Photo } from './Photo';

export interface ImageListItemProps {
    img: Photo;
    isFavorited: boolean;
    onFavourite: (img: Photo) => void;
    onUnfavourite: (imageId: number) => void;
}