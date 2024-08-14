import { useLoaderData } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
// import axios from "axios";
import ReviewCard from "./ReviewCard";
import useReviews from "../../assets/hooks/useReviews";
import useAvailability from "../../assets/hooks/useAvailability";
// import { useState } from "react";

const RoomDetails = () => {
  const room = useLoaderData();
  const { user } = useContext(AuthContext);
  const [dayDifference, setDayDifference] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const { _id, description, pricePerNight, roomSize, images } = room;
  const { reviews } = useReviews(_id);
  const { status } = useAvailability(_id);

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
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(room),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
        />
        <img className="w-full h-full " src={images[1]} />
        <img className="w-full h-full rounded-tr-xl" src={images[2]} />
        <img className="w-full h-full " src={images[3]} />
        <img className="rounded-br-xl w-full h-full" src={images[4]} />
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
            <h1 className="text-base font-normal">
              <span className="text-xl">${pricePerNight}</span> night
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
              <button
                disabled={status === "booked"}
                className="btn btn-secondary"
              >
                Book Now
              </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default RoomDetails;
