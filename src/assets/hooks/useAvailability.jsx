import axios from "axios";
import { useEffect, useState } from "react";

const useAvailability = (id) => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [status, setStatus] = useState("available");

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings")
      .then((res) => setBookedRooms(res.data));
  }, []);
  useEffect(() => {
    const roomStatus = bookedRooms.find(
      (bookedRoom) => bookedRoom.roomId === id
    )
      ? "booked"
      : "available";
    setStatus(roomStatus);
  }, [bookedRooms, id]);

  return { bookedRooms, status };
};

export default useAvailability;
