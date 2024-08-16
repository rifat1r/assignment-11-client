import axios from "axios";
import { useEffect, useState } from "react";

const useFeaturedRooms = (id) => {
  const [featuredRoom, setFeaturedRoom] = useState(null);
  useEffect(() => {
    axios
      .post("http://localhost:5000/featuredId", { featuredRoomId: id })
      .then((res) => setFeaturedRoom(res.data));
  }, [id]);
};

export default useFeaturedRooms;
