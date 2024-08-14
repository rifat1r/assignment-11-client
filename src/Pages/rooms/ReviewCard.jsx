// import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  const { rating, comment, email, name, roomId, date, image } = review;
  const currentTime = new Date(date);
  const time = currentTime.toLocaleTimeString();
  const day = currentTime.toLocaleDateString();
  // console.log("date", time, day);
  const timestamp = day + " " + time;
  return (
    <div className="border p-3 rounded-lg border-black">
      <div className="flex items-center gap-2 ">
        <div className="w-11 rounded-full">
          <img
            className="rounded-btn"
            src={
              image
                ? image
                : "https://i.postimg.cc/1tmgvBcN/453178253-471506465671661-2781666950760530985-n.png"
            }
            alt=""
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p>{timestamp}</p>
        </div>
      </div>
      <div>
        <div>
          <Rating name="read-only" value={rating} readOnly />
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
