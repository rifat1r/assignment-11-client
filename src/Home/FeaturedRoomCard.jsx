import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import useReviews from "../assets/hooks/useReviews";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
import useAvailability from "../assets/hooks/useAvailability";
// ..
AOS.init();

const FeaturedRoomCard = ({ featuredRoom, animation }) => {
  const { _id, title, images, pricePerNight, roomSize, description } =
    featuredRoom;
  const { status } = useAvailability(_id);
  const { reviews } = useReviews(_id);
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : null;
  const rating = Math.round(averageRating);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      data-aos={animation}
      data-aos-offset="200"
      //   data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      //   data-aos-once="false"
      data-aos-anchor-placement="top-middle"
      className="card card-side bg-base-100  shadow-xl border w-full  rounded-sm my-3"
    >
      <figure className="w-1/3 border">
        <img
          className="w-full h-full"
          src={images}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
      </figure>
      <div className="p-3 card-body">
        <h2 className="card-title">{title}</h2>
        <div className="flex gap-3 items-center">
          {reviews && (
            <div>
              <p className=" font-medium bg-green-400 text-white px-2 py-0 rounded-sm ">
                {reviews.length} Reviews
              </p>
            </div>
          )}
          <div className="pt-2">
            <Rating name="read-only" value={rating} readOnly />
          </div>
          {/* <span>·</span> */}
        </div>
        <div className="flex justify-start gap-3 items-center ">
          <h2 className="text-xl">Area: {roomSize}</h2>
          <h2 className="text-lg">
            ${pricePerNight}
            <span> night</span>
          </h2>
        </div>
        <div className="card-actions justify-end text-lg">
          <div className="">
            <Link to={`/room/${_id}`}>
              <button className="btn btn-sm rounded-none bg-slate-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRoomCard;
