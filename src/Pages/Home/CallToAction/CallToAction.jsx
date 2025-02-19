import dogImg from "../../../assets/home/call-to-action/adot-dog.jpg";
import catImg from "../../../assets/home/call-to-action/adopt-cat.jpg";
import petCareImg from "../../../assets/home/call-to-action/pet-care.png";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="mt-12 md:py-10">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-0">
        {/* image section */}
        <div className="md:w-1/2 relative z-10">
          <div className="w-[250px] h-[300px] md:w-[300px] md:h-[400px] lg:w-[420px] lg:h-[500px] pt-1 pl-1 rounded-2xl bg-primaryBlue">
            <img
              className="w-full h-full object-cover rounded-2xl object-left"
              src={dogImg}
              alt="dog-image"
            />
          </div>
          <div className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[300px] lg:h-[300px] absolute -bottom-5 -left-5 md:right-[8%] lg:left-[30%] p-1 bg-primaryPink rounded-full">
            <img
              className="w-full h-full object-cover rounded-full"
              src={catImg}
              alt="cat-image"
            />
          </div>
        </div>
        {/* text section */}
        <div className="md:w-1/2 space-y-3 md:space-y-5 lg:space-y-8">
          <div className="w-10 h-10">
            <img className="w-full h-full object-cover" src={petCareImg} alt="pet-care-logo" />
          </div>
          <h3 className="text-base md:text-2xl lg:text-4xl font-semibold">
            Open Your Heart, Find Your Perfect Companion Today!
          </h3>
          <p className="md:w-4/5 text-sm md:text-base">
            Every pet deserves a chance at a happy and loving home. By adopting,
            you’re not just changing their life—you’re filling yours with
            unconditional love and companionship. Start the journey of giving
            them a better tomorrow today!
          </p>
          <Button variant={`primary`}>Find a Friend</Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
