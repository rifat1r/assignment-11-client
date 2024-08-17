import Banner from "./Banner/Banner";
import FeaturedRooms from "./FeaturedRooms";
import Footer from "./Footer";
// import TopReviewedRooms from "./FeaturedRooms";
import MyMap from "./MyMap";
import NewsletterSignup from "./NewsletterSignup";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedRooms></FeaturedRooms>
      <MyMap></MyMap>
      <NewsletterSignup></NewsletterSignup>
      <Footer></Footer>
    </div>
  );
};

export default Home;
