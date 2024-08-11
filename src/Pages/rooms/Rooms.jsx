import { useEffect } from "react";
import { useState } from "react";
import RoomCard from "./RoomCard";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {rooms.map((room) => (
        <RoomCard room={room} key={room.roomId}></RoomCard>
      ))}
    </div>
  );
};

export default Rooms;
