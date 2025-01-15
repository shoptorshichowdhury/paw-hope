import { Button } from "@/components/ui/button";
import petImg from "../../assets/pet-details/dog.jpg";
import DonationPetCard from "@/components/common/DonationPetCard/DonationPetCard";

const DonationDetails = () => {
  return (
    <div className="w-11/12 mx-auto my-12">
      <div className="text-xl md:text-2xl lg:text-5xl font-semibold mb-5 md:mb-10 lg:mb-16 px-6 py-4 bg-primaryPink/20 rounded-xl flex justify-center items-center">
        Donation Details
      </div>

      {/* Pet details section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-[#2C3E50] p-5 md:p-8 lg:p-12 rounded-2xl">
        {/* -----1st part------- */}
        <div className="space-y-5">
          {/* short description */}
          <div className="space-y-5">
            <h3 className="text-lg md:text-2xl lg:text-4xl font-semibold text-primaryPink">
              Donate Something!
            </h3>
            <p className="text-sm lg:text-base text-justify font-light">
              The domestic dog is a doiated dendant of the wolf. The dog t is
              derived from an ancient, extinct wolf, and the modern grey wolf is
              the dog's nesdarest living relative. The dog was the first species
              to be domesticated, by hunter–gateiherers. These will include the
              core vaccines, which are in a series of three: at 6-, 12-, and 16
              weeks old.
            </p>
          </div>

          {/* pet image */}
          <div className="h-[250px] md:h-[350px] lg:h-[480px]">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={petImg}
              alt="pet-image"
            />
          </div>
        </div>

        {/* ------2nd part------ */}
        <div className="space-y-5">
          {/* donation information */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Donation Information:
            </p>
            <div className="flex items-center gap-5">
              <div className="text-sm font-medium space-y-2">
                <p>Maximum Donation Amount:</p>
                <p>Donated Amount:</p>
                <p>Last Date of Donation:</p>
              </div>
              <div className="text-sm space-y-2">
                <p>$30</p>
                <p>$200</p>
                <p>20 January, 2025</p>
              </div>
            </div>
          </div>
          {/* long description */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Details Information:
            </p>
            <p className="text-sm lg:text-base text-justify font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
              atque voluptatem accusantium soluta? Ad dicta unde ullam delectus
              suscipit, ab inventore, modi tempore repudiandae iure, dolor
              aliquid ipsa iusto. Debitis, dicta dolores voluptatibus hic
              tempore veniam eaque sint consectetur repudiandae eum consequatur,
              provident reprehenderit. Eos consectetur aliquam natus mollitia.
              Laborum nesciunt reiciendis eligendi ex similique quibusdam, ad
              sit, consequatur nisi consequuntur placeat excepturi odit velit!
              Quibusdam perspiciatis optio similique veniam.
            </p>
          </div>
          <Button>Donate Now</Button>
        </div>
      </section>

      {/* recommended donation section */}
      <section className="my-12">
        <div className="my-5 md:my-8 lg:my-10">
            <p className="text-xl md:text-2xl lg:text-4xl font-medium">Recommended Campaigns</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
          <DonationPetCard />
          <DonationPetCard />
          <DonationPetCard />
        </div>
      </section>
    </div>
  );
};

export default DonationDetails;
