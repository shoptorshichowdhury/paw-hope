import petImg from "../../assets/pet-details/dog.jpg";
import DonationPetCard from "@/components/common/DonationPetCard/DonationPetCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { useQuery } from "react-query";
import DonationFormButton from "@/components/common/DonationFormButton/DonationFormButton";

const DonationDetails = () => {
  const { id } = useParams();

  const { data: donationData = {}, refetch } = useQuery({
    queryKey: ["donationData", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-campaign/${id}`
      );

      return data;
    },
  });

  const {
    petName,
    petImage,
    maxAmount,
    lastDate,
    shortDescription,
    longDescription,
    donatedAmount,
    status,
    _id,
  } = donationData || {};

  //get recommended active campaigns
  const { data: activeCampaigns = [] } = useQuery({
    queryKey: ["activeCampaigns"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/active-donations`
      );
      return data;
    },
  });

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
              {petName}
            </h3>
            <p className="text-sm lg:text-base text-justify font-light">
              {shortDescription}
            </p>
          </div>

          {/* pet image */}
          <div className="h-[250px] md:h-[350px] lg:h-[480px]">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={petImage}
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
                <p>${maxAmount}</p>
                <p>${donatedAmount}</p>
                <p>{lastDate && format(new Date(lastDate), "PPP")}</p>
              </div>
            </div>
          </div>
          {/* long description */}
          <div className="space-y-3">
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Details Information:
            </p>
            <p className="text-sm lg:text-base text-justify font-light">
              {longDescription}
            </p>
          </div>
          <DonationFormButton donationData={donationData} refetch={refetch} />
        </div>
      </section>

      {/* recommended donation section */}
      <section className="my-12">
        <div className="my-5 md:my-8 lg:my-10">
          <p className="text-xl md:text-2xl lg:text-4xl font-medium">
            Recommended Campaigns
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
          {activeCampaigns.map((activeCampaign) => (
            <DonationPetCard
              key={activeCampaign._id}
              campaign={activeCampaign}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DonationDetails;
