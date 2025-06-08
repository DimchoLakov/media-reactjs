import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div className="relative m-2 cursor-pointer">
      <a href={photo.url} target="_blank" rel="noopener noreferrer">
        <img
          src={photo.url}
          alt="Album Photo"
          className="w-36 h-36 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
        />
      </a>
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80" onClick={handleRemovePhoto}>
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}

export default PhotosListItem;
