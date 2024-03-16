import React, { useRef } from 'react';
import { ImageListItemProps } from '../types/ImageListItemProps';
import useIntersectionObserver from '../customHooks/useIntersectionObserver';

const ImageListItem: React.FC<ImageListItemProps> = ({
    img,
    isFavorited,
    onFavourite,
    onUnfavourite,
}) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(imageRef, 0.7);

    return (
        <div ref={imageRef} key={img.id} className="images-list-item">
            <div className={`image-box ${isVisible ? 'shadow' : ''}`}>
                <picture>
                    {isVisible && (
                        <>
                            <source
                                media="(min-width: 71.25em)"
                                srcSet={img.src.large}
                            />
                            <source
                                media="(min-width: 48em)"
                                srcSet={img.src.medium}
                            />
                            <img
                                src={img.src.tiny}
                                alt={img.alt}
                                className={`image ${
                                    isVisible ? 'image-appear' : ''
                                }`}
                                loading="lazy"
                            />
                        </>
                    )}
                </picture>
                {isFavorited ? (
                    <figcaption className="caption-liked">
                        <p>Favourited</p>
                    </figcaption>
                ) : (
                    <figcaption className="caption">
                        <p className="image-description">{img.alt}</p>
                        <div className="bottom-line"></div>
                        <p className="image-photographer">{img.photographer}</p>
                        <button
                            className="btn"
                            onClick={() => onFavourite(img)}
                        >
                            Favourite
                        </button>
                    </figcaption>
                )}
                <figcaption className="caption-unlike">
                    <button
                        className="btn"
                        onClick={() =>
                            isFavorited
                                ? onUnfavourite(img.id)
                                : onFavourite(img)
                        }
                    >
                        {isFavorited ? 'Remove from favourites' : 'Favourite'}
                    </button>
                </figcaption>
            </div>
        </div>
    );
};

export default ImageListItem;
