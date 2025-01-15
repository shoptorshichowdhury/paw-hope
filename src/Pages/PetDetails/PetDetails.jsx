import AdoptFormButton from "@/components/common/AdoptFormButton/AdoptFormButton";
import petImg from "../../assets/pet-details/dog.jpg";
import { Button } from "@/components/ui/button";

const PetDetails = () => {
  return (
    <div className="w-11/12 mx-auto my-12">
      <div className="text-xl md:text-2xl lg:text-5xl font-semibold mb-5 md:mb-10 lg:mb-16 px-6 py-4 bg-primaryPink/20 rounded-xl flex justify-center items-center">
        Pet Details
      </div>

      {/* Pet details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-[#2C3E50] p-5 md:p-8 lg:p-12 rounded-2xl">
        {/* -----1st part------- */}
        <div className="space-y-5">
          {/* name & short description */}
          <div className="space-y-3">
            <h3 className="text-lg md:text-2xl lg:text-4xl font-semibold">
              Siberian Husky
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
          {/* pet information */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Pet Information:
            </p>
            <div className="flex items-center gap-5">
              <div className="text-sm font-medium">
                <p>Age:</p>
                <p>Category:</p>
                <p>Location:</p>
              </div>
              <div className="text-sm">
                <p>3 Year</p>
                <p>Dog</p>
                <p>Mirpur, Dhaka</p>
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
          <AdoptFormButton></AdoptFormButton>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
