import DonationPetCard from "@/components/common/DonationPetCard/DonationPetCard";
import PageBanner from "@/components/common/PageBanner/PageBanner";
import axios from "axios";
import { useQuery } from "react-query";
import PublicSkeletonCard from "../Shared/LoadingSkeleton/PublicSkeletonCard";

const DonationCampaigns = () => {
  //get all donationCampaigns
  const { data: donationCampaigns = [], isLoading } = useQuery({
    queryKey: ["donationCampaigns"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-campaigns`
      );
      return data;
    },
  });

  return (
    <section>
      {/* page banner section */}
      <PageBanner
        title={`Make a Difference with Your Donation`}
        subTitle={`Every contribution helps provide care and shelter for pets in need. Donate and make a difference today!`}
      />
      {/* donation campaign container */}
      <div className="w-11/12 mx-auto my-12 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {isLoading && <PublicSkeletonCard cards={8}></PublicSkeletonCard>}
        {donationCampaigns.map((campaign) => (
          <DonationPetCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
};

export default DonationCampaigns;
