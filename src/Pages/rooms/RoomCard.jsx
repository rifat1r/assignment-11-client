import { Link } from "react-router-dom";
import useReviews from "../../assets/hooks/useReviews";
import useAvailability from "../../assets/hooks/useAvailability";
import useAuth from "../../assets/hooks/useAuth";
import { Rating } from "@mui/material";

const RoomCard = ({ room }) => {
  const { _id, images, pricePerNight, roomSize, description, title } = room;
  const { status } = useAvailability(_id);
  const { reviews } = useReviews(_id);
  const { user } = useAuth();
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : null;
  const rating = Math.round(averageRating);

  return (
    <Link to={`/room/${_id}`}>
      <div className="card bg-base-100 w-96 mx-auto  shadow-xl rounded-lg mb-8">
        <figure className="relative">
          <img
            className="max-w-xl h-72"
            src={images}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
            }}
          />
          {user && (
            <span className="absolute bg-green-400 text-white px-3 py-1 rounded-md top-3 left-3  ">
              {status}
            </span>
          )}
        </figure>
        <div className="p-3 space-y-2">
          <h2 className="text-2xl font-medium">{title}</h2>
          <div className="flex gap-3 items-center">
            {reviews && (
              <p className="text-end font-medium bg-green-400 text-white px-2 py-0 rounded-sm">
                {reviews.length} Reviews
              </p>
            )}
            <div className="pt-2">
              <Rating name="read-only" value={rating} readOnly />
            </div>
            {/* <span>·</span> */}
          </div>

          <hr />

          <div className="card-actions justify-end">
            <p className="text-lg font-medium">${pricePerNight} night</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
