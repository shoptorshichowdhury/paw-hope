import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Category from "../Category/Category";
import DonateNow from "../DonateNow/DonateNow";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="w-11/12 lg:max-w-6xl mx-auto">
      <Banner></Banner>
      <Category></Category>
      <CallToAction />
      <AboutUs />
      <Testimonial />
      <DonateNow></DonateNow>
    </div>
  );
};

export default Home;
