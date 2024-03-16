export interface Photo {
    id: number;
    photographer: string;
    src: {
        large: string;
        medium: string;
        tiny: string;
    }
    alt: string;
}