import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../assets/hooks/useAuth";
import useRoom from "../../assets/hooks/useRoom";
import toast, { Toaster } from "react-hot-toast";

const ReviewModal = ({ booking }) => {
  const { user } = useAuth();
  const { _id, roomId } = booking;
  const room = useRoom(roomId);
  const { title } = room;
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === 0) {
      return alert("Please provide a rating");
    }
    const comment = e.target.review.value;
    const currentTime = new Date().toISOString();
    console.log(
      "review--->",
      comment,
      value,
      user.email,
      user.displayName,
      currentTime
    );
    const review = {
      rating: value,
      comment,
      email: user.email,
      name: user.displayName,
      roomId,
      date: currentTime,
      image: user.photoURL,
    };
    axios
      .post("http://localhost:5000/reviews", review)
      .then((res) => {
        toast.success("Your Review Published Successfully");
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    e.target.reset();
    setValue(0);
  };

  return (
    <div className="">
      <Toaster />

      <input type="checkbox" id={`modal_${_id}`} className="modal-toggle" />
      <div className="modal " role="dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-box w-screen ">
            <h2 className="text-3xl text-center bg-slate-300 py-1 rounded-lg">
              Rate Your Stay
            </h2>

            <br />

            <Typography component="legend">
              <h2 className="text-xl text-center mb-4">{title}</h2>
            </Typography>

            <div className="text-center font-extrabold">
              <Rating
                aria-required
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <br />

            <textarea
              className="textarea textarea-bordered border-orange-400 textarea-md w-full max-w-xl "
              name="review"
              required
              placeholder="Write your review here..."
            ></textarea>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <label htmlFor={`modal_${_id}`} className="btn">
                Close
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
