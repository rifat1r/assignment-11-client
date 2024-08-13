import axios from "axios";
import { useEffect, useState } from "react";

const useReviews = (id) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews?id=${id}`)
      .then((res) => {
        setReviews(res.data);
        console.log("review in room details", res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  return { reviews };
};

export default useReviews;
