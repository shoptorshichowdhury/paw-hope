import { Button } from "@/components/ui/button";
import catImage from "../../../assets/banner/catbanner.jpg";
import dogImage from "../../../assets/banner/dogbanner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center py-5 md:py-12">
        {/* text content */}
        <div className="md:w-1/2 space-y-5 md:space-y-10 lg:space-y-14">
          <div className="space-y-8">
            <h2 className="text-xl md:text-3xl lg:text-6xl font-semibold">
              Find Your <span className="text-primaryPink">Forever</span> Friend
              Today!
            </h2>
            <p>
              Bring love, joy, and companionship into your life by giving a
              <br className="lg:inline-block hidden" /> furry friend a forever
              home.
            </p>
          </div>
          <div>
            <Link to={`/petListing`}>
              <Button variant={`primary`}>Adopt Now</Button>
            </Link>
          </div>
        </div>

        {/* image content */}
        <div className="md:w-1/2 space-y-3 md:space-y-5">
          {/* cat part */}
          <div className="flex gap-5 lg:gap-10 items-center">
            <div className="w-28 md:w-40 lg:w-60">
              <img
                className="w-full h-full object-cover rounded-3xl"
                src={catImage}
                alt="cat"
              />
            </div>
            <span className="text-lg md:text-xl lg:text-4xl font-medium text-primaryBlue">
              <span>12k+</span>
              <br />
              Transaction
            </span>
          </div>
          {/* dog part */}
          <div className="w-full">
            <img
              className="w-full h-full object-cover rounded-3xl"
              src={dogImage}
              alt="dog"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
