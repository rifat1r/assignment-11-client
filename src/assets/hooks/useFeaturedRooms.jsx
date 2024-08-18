import axios from "axios";
import { useEffect, useState } from "react";

const useFeaturedRooms = (id) => {
  const [featuredRoom, setFeaturedRoom] = useState(null);
  useEffect(() => {
    axios
      .post("https://assignment-11-server-tau-pied.vercel.app/featuredId", {
        featuredRoomId: id,
      })
      .then((res) => setFeaturedRoom(res.data));
  }, [id]);
};

export default useFeaturedRooms;
