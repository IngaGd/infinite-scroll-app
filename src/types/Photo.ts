export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    src: {
        large: string;
        medium: string;
        tiny: string;
    }
    alt: string;
}