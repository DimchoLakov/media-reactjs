import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from './PhotosListItem';

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation(album);

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8" />
  } else if (error) {
    content = <div>Error fetching photos for album - {album.title}. Error message - {error.message}</div>
  } else {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />
    });
  }

  return (
    <>
      <div>
        <div className="m-2 flex flex-row items-center justify-between">
          <h3 className="text-lg font-bold">Photos in {album.title}</h3>
          <Button onClick={handleAddPhoto} className="cursor-pointer">+ Add Photo</Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">
          {content}
        </div>
      </div>
    </>
  );
}

export default PhotosList;
