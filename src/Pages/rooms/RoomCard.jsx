import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { _id, images, pricePerNight, roomSize, description } = room;
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
              <div className="badge badge-secondary">4.3</div>
            </h2>
            <span>·</span>
            <p>10 reviews</p>
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
