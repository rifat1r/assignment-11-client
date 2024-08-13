import { Link } from "react-router-dom";
import useReviews from "../../assets/hooks/useReviews";

const RoomCard = ({ room }) => {
  const { _id, images, pricePerNight, roomSize, description } = room;
  const { reviews } = useReviews(_id);
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : null;

  return (
    <Link to={`/room/${_id}`}>
      <div className="card bg-base-100 w-96 shadow-xl ">
        <figure>
          <img src={images} />
        </figure>
        <div className="card-body">
          <div className="flex gap-2 items-center">
            <h2 className="card-title ">
              Ratings
              <div className="badge badge-secondary">
                {averageRating ? averageRating : "0"}
              </div>
            </h2>
            <span>·</span>
            {reviews && <p>{reviews.length} reviews</p>}
          </div>

          {/* <p>{description}</p> */}
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
