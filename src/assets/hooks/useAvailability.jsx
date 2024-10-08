import axios from "axios";
import { useEffect, useState } from "react";

const useAvailability = (id) => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get("https://assignment-11-server-tau-pied.vercel.app/allBookings", {
        withCredentials: true,
      })
      .then((res) => setBookedRooms(res.data));
  }, []);
  useEffect(() => {
    const roomStatus = bookedRooms.find(
      (bookedRoom) => bookedRoom.roomId === id
    )
      ? "Booked"
      : "Available";
    setStatus(roomStatus);
    // console.log('')
  }, [bookedRooms, id]);

  return { bookedRooms, status };
};

export default useAvailability;
