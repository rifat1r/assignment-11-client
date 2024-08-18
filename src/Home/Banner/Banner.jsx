import { useEffect, useRef } from "react";
import bannerVideo from "../../assets/bannerVideo.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Adjust the playback speed (0.5 is half-speed)
    }
  }, []);

  return (
    <div className="min-w-full relative my-6 rounded-xl ">
      <video
        className="h-[500px] min-w-full object-cover rounded-xl"
        ref={videoRef}
        autoPlay
        loop
        muted
        src={bannerVideo}
      ></video>
      <div className="absolute left-0 top-0 pl-12  text-white  bg-gradient-to-r  from-[#151515] to-[rgba(21,21,21,0)] h-[500px] min-w-full mx-auto pt-28 space-y-7">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full">
          Welcome to my site
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          Relax in our elegantly designed rooms, offering the perfect blend of
          <br /> comfort and style. Enjoy a seamless stay with all the comforts
          of home.
        </p>

        <div>
          <Link className="pt-5" to="/rooms">
            {" "}
            <button className="btn btn-primary mr-4">Book Now</button>
          </Link>
          <Link to="/rooms">
            <button className="btn btn-secondary mr-5 btn-outline">
              Explore Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
