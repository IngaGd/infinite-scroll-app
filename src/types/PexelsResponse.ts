import { Photo } from './Photo';

export interface PexelsResponse {
    page: number;
    per_page: number;
    photos: Photo[];
}