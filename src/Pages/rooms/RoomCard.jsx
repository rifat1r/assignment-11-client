import { Link } from "react-router-dom";
import useReviews from "../../assets/hooks/useReviews";
import { FaStar } from "react-icons/fa";
import useAvailability from "../../assets/hooks/useAvailability";

const RoomCard = ({ room }) => {
  const { _id, images, pricePerNight, roomSize, description } = room;
  const { status } = useAvailability(_id);
  const { reviews } = useReviews(_id);
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : null;
  const shortDescription = `${description.slice(0, 50)} .....`;

  return (
    <Link to={`/room/${_id}`}>
      <div className="card bg-base-100 w-80 mx-auto  shadow-xl rounded-lg">
        <figure className="relative">
          <img
            className="max-w-xl h-72"
            src={
              images
                ? images
                : "https://images.unsplash.com/photo-1610395761656-689d4a0142e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGhvdGVsJTIwcm9vbXN8ZW58MHwwfDB8fHwy"
            }
          />
          <span className="absolute bg-white px-2 py-1 rounded-md top-3 left-3 opacity-80 ">
            {status}
          </span>
        </figure>
        <div className="p-3">
          <div className="flex gap-2 items-center ">
            <h2 className="card-title ">
              Ratings :
              <div className="flex items-center gap-2">
                {averageRating ? averageRating : "0"}
                <span className="text-orange-400">
                  <FaStar></FaStar>
                </span>
              </div>
            </h2>
            <span>·</span>
            {reviews && <p>{reviews.length} reviews</p>}
          </div>

          <p>{shortDescription}</p>
          <hr />

          <div className="card-actions justify-end">
            <p className="text-end text-slate-500 font-medium">
              ${pricePerNight} night
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
