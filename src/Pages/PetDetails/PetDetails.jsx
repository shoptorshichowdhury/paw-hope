import AdoptFormButton from "@/components/common/AdoptFormButton/AdoptFormButton";
import petImg from "../../assets/pet-details/dog.jpg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import parse from "html-react-parser";

const PetDetails = () => {
  const { id } = useParams();

  const { data: petData = {} } = useQuery({
    queryKey: ["petData", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/pet/${id}`
      );
      return data;
    },
  });

  const {
    photo,
    name,
    age,
    category,
    location,
    shortDescription,
    longDescription,
  } = petData || {};

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
              {name}
            </h3>
            <p className="text-sm lg:text-base text-justify font-light">
              {shortDescription}
            </p>
          </div>
          {/* pet image */}
          <div className="h-[250px] md:h-[350px] lg:h-[480px]">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={photo}
              alt="pet-image"
            />
          </div>
        </div>

        {/* ------2nd part------ */}
        <div className="space-y-5">
          {/* pet information */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium p-3 bg-primaryBlue/30 rounded-xl">
              Pet Information:
            </p>
            <div className="flex items-center gap-5">
              <div className="text-sm font-medium space-y-2">
                <p>Age:</p>
                <p>Category:</p>
                <p>Location:</p>
              </div>
              <div className="text-sm space-y-2">
                <p>{age}</p>
                <p>{category}</p>
                <p>{location}</p>
              </div>
            </div>
          </div>
          {/* long description */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium p-3 bg-primaryBlue/30 rounded-xl">
              Detailed Information:
            </p>
            <div className="tiptap text-sm lg:text-base text-justify font-light">
              {longDescription && parse(String(longDescription))}
            </div>
          </div>
          <AdoptFormButton petData={petData}></AdoptFormButton>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
