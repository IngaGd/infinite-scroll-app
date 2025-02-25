import useFetchData from '../customHooks/useFetchData';
import useHandleFavourites from '../customHooks/useHandleFavourites';
import ImageListItem from './ImageListItem';
import { Photo } from '../types/Photo';

const ListOfImages: React.FC = () => {
    const { fetchedImages, error } = useFetchData();
    const { favouritedImages, addImage, removeImage } = useHandleFavourites();

    const favouritedImagesIds = favouritedImages.map((img: Photo) => img.id);
    const fetchedImagesWithoutFavourited = fetchedImages.filter(
        (img: Photo) => !favouritedImagesIds.includes(img.id)
    );

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <section className="image-list">
            {favouritedImages?.map((img: Photo) => (
                <ImageListItem
                    key={img.id}
                    img={img}
                    isFavorited={true}
                    onFavourite={addImage}
                    onUnfavourite={removeImage}
                />
            ))}
            {fetchedImagesWithoutFavourited?.map((img: Photo) => (
                <ImageListItem
                    key={img.id}
                    img={img}
                    isFavorited={false}
                    onFavourite={addImage}
                    onUnfavourite={removeImage}
                />
            ))}
        </section>
    );
};

export default ListOfImages;
