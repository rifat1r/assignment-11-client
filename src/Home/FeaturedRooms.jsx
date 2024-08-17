import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedRoomCard from "./FeaturedRoomCard";

const FeaturedRooms = () => {
  const animations = ["fade-up", "fade-down", "fade-left", "fade-right"];
  const [bookedRooms, setBookedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allBookings", { withCredentials: true })
      .then((res) => setBookedRooms(res.data));

    axios.get("http://localhost:5000/rooms").then((res) => setRooms(res.data));
  }, []);

  const availableRooms = rooms
    .filter((room) => {
      return !bookedRooms.some((bookedRoom) => bookedRoom.roomId === room._id);
    })
    .slice(0, 10);

  console.log(availableRooms, "heyy");
  return (
    <div className="my-10">
      <h2 className="text-5xl font-semibold mb-4">Featured Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 ">
        {availableRooms.map((availableRoom, index) => (
          <FeaturedRoomCard
            key={availableRoom._id}
            featuredRoom={availableRoom}
            animation={animations[index % animations.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
