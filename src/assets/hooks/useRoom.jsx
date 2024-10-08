import axios from "axios";
import { useEffect, useState } from "react";

const useRoom = (id) => {
  const [room, setRoom] = useState("");
  useEffect(() => {
    axios
      .get(`https://assignment-11-server-tau-pied.vercel.app/room/${id}`)
      .then((res) => setRoom(res.data));
    // .catch((error) => console.log(error));
  }, [id]);
  return room;
};

export default useRoom;
