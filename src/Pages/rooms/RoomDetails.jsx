import { useLoaderData, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";
import ReviewCard from "./ReviewCard";
import useReviews from "../../assets/hooks/useReviews";
import useAvailability from "../../assets/hooks/useAvailability";
import Swal from "sweetalert2";

// import { useState } from "react";

const RoomDetails = () => {
  const room = useLoaderData();
  const { user } = useContext(AuthContext);
  const [dayDifference, setDayDifference] = useState(1);
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  const { _id, description, pricePerNight, roomSize, images, title } = room;
  const { reviews } = useReviews(_id);
  const { status } = useAvailability(_id);
  const navigate = useNavigate();

  const handledayDifference = (e) => {
    e.preventDefault();
    const checkIn = new Date(e.target.ckeckIn.value);
    const checkOut = new Date(e.target.ckeckOut.value);
    const differenceInTime = checkOut.getTime() - checkIn.getTime();
    const differenceInDay = differenceInTime / (1000 * 60 * 60 * 24);
    console.log("day difference", differenceInDay);
    setDayDifference(differenceInDay);
  };
  const handleBook = (e) => {
    e.preventDefault();
    if (status === "Booked") {
      Swal.fire({
        title: "Booking Unavailable",
        text: "This room is already booked.",
        icon: "warning",
      });
      return;
    }
    if (!user?.email) {
      return navigate("/login");
    }
    const checkIn = e.target.ckeckIn.value;
    const email = user.email;
    const name = user.displayName;

    const room = {
      checkIn,
      images,
      email,
      name,
      pricePerNight,
      roomId: _id,
    };
    console.log(room);
    Swal.fire({
      title: "Are you sure?",
      html: `
      <div style="text-align: left;">
        <img src="${images[0]}" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 15px;">
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
          Check-In: <span style="font-weight: normal;">${checkIn}</span>
        </h2>
        <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
          Per Night: <span style="font-weight: normal;">$${pricePerNight}</span>
        </h2>
        <hr style="margin: 15px 0;">
        <h2 style="font-size: 25px; font-weight: bold; margin-bottom: 10px;">${title}</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #333;">
          ${description}
        </p>
      </div>
    `,

      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Booking",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/bookings", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(room),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        Swal.fire({
          title: "Confirmed",
          text: "Booking Successful",
          icon: "success",
        });
      }
    });
  };
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-4  gap-2 rounded-lg mb-5">
        {" "}
        <img
          className="col-span-2 row-span-2 w-full h-full rounded-l-xl "
          src={images[0]}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
        <img
          className="w-full h-full "
          src={images[1]}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
        <img
          className="w-full h-full rounded-tr-xl"
          src={images[2]}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
        <img
          className="w-full h-full "
          src={images[3]}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
        <img
          className="rounded-br-xl w-full h-full"
          src={images[4]}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1630404916223-9ffb5b5d51e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tJTIwd2l0aCUyMG5hdHVyZSUyMHZpZXd8ZW58MHwwfDB8fHwy";
          }}
        />
      </div>
      <div className="flex">
        <div className="space-y-4  mr-10  pl-5">
          <h2 className="text-4xl font-medium">About This Room</h2>
          <p>{description}</p>
          <hr />
          <div className="flex  border border-black p-3 justify-center md:w-full lg:w-3/5 ml-0 gap-5 rounded-lg text-lg">
            <div className="flex items-center gap-1 border-r border-black pr-3 ">
              Ratings : {averageRating}{" "}
              <span className="text-orange-500">
                <FaStar></FaStar>
              </span>
            </div>
            <div className="underline">{reviews.length} Reviews</div>
            <div className="border-l border-black pl-3 underline">
              Area : {roomSize}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleBook} className="card-body">
            <h1 className="text-2xl  font-normal">
              ${pricePerNight}
              <span className="text-xl pl-1">night</span>
            </h1>{" "}
            <div className="flex border rounded-lg border-black ">
              <div className=" border-r border-black w-full pl-2">
                <p>check-in</p>
                <input
                  onChange={handledayDifference}
                  className=""
                  type="date"
                  name="ckeckIn"
                  required
                />
              </div>
              <div className=" w-full pl-2">
                <p>check-out</p>
                <input
                  onChange={handledayDifference}
                  className=""
                  type="date"
                  name="ckeckOut"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-secondary">Book Now</button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-end ">
                <p className="underline">
                  ${pricePerNight}× {dayDifference} nights
                </p>
                <span>${pricePerNight * dayDifference}</span>
              </div>
              <div className="flex justify-between">
                <p>Tax</p>
                <span>${pricePerNight * dayDifference * 0.05}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-medium">
                <h2>Total</h2>
                <h2>
                  $
                  {pricePerNight * dayDifference +
                    pricePerNight * dayDifference * 0.05}
                </h2>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <h2 className=" text-4xl font-semibold mt-20 mb-4">Guest Experiences</h2>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </div>
      ) : (
        <div className="text-2xl border-2 text-center  mb-10 mx-10 p-4">
          <h2>
            No reviews yet. Be the first to share your experience! You can add a
            review after booking this room from your 'My Bookings' page.
          </h2>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
