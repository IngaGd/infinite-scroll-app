import useFetchData from '../customHooks/useFetchData';
import useSrollToBottom from '../customHooks/useSrollToBottom';
import useHandleFavourites from '../customHooks/useHandleFavourites';
import ImageListItem from './ImageListItem';
import { Photo } from '../types/Photo';

const ListOfImages: React.FC = () => {
    const scrolledToBottom = useSrollToBottom();
    const fetchedImages = useFetchData(scrolledToBottom);
    const { favouritedImages, addImage, removeImage } = useHandleFavourites();

    const favouritedImagesIds = favouritedImages.map((img: Photo) => img.id);

    const fetchedImagesWithoutFavourited = fetchedImages.filter(
        (img: Photo) => !favouritedImagesIds.includes(img.id)
    );

    return (
        <section className="container">
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
