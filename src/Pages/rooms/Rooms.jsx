import { useEffect } from "react";
import { useState } from "react";
import RoomCard from "./RoomCard";
// import useAvailability from "../../assets/hooks/useAvailability";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  // const { availableRooms } = useAvailability();
  // console.log("available rooms", availableRooms.length);
  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  max-w-6xl mx-auto">
      {rooms.map((room) => (
        <RoomCard room={room} key={room._id}></RoomCard>
      ))}
    </div>
  );
};

export default Rooms;
