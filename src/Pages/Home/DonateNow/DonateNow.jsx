import { Button } from "@/components/ui/button";
import donateBanner from "../../../assets/home/donate-now/donatebanner2.jpg";
import { Link } from "react-router-dom";

const DonateNow = () => {
  return (
    <section className="my-12 lg:my-20">
      <div
        className="h-[280px] md:h-[400px] lg:h-[480px] bg-cover bg-no-repeat bg-top lg:bg-center bg-neutral-600 bg-blend-overlay rounded-2xl flex justify-center items-start lg:items-center"
        style={{ backgroundImage: `url(${donateBanner})` }}
      >
        <div className="lg:w-4/5 flex flex-col items-center justify-center md:gap-3 lg:gap-5 lg:mb-16 px-4 py-5 md:py-8">
          <h3 className="text-lg md:text-2xl lg:text-4xl font-medium">
            Help Us Make a Difference
          </h3>
          <p className="text-center md:w-4/6 text-xs md:text-sm">
            Your generous donations provide essential care, food, and shelter to
            pets in need. Join us in giving these animals a chance at a better
            life.
          </p>
          <div>
            <Link to={`/donationCampaigns`}>
              <Button variant={`primary`}>Donate Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateNow;
