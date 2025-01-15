import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Category from "../Category/Category";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <CallToAction />
      <AboutUs />
      <Testimonial />
    </div>
  );
};

export default Home;
