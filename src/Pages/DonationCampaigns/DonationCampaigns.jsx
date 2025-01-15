import AdoptPetCard from "@/components/common/AdoptPetCard/AdoptPetCard";
import DonationPetCard from "@/components/common/DonationPetCard/DonationPetCard";
import PageBanner from "@/components/common/PageBanner/PageBanner";

const DonationCampaigns = () => {
  return (
    <section>
      {/* page banner section */}
      <PageBanner
        title={`Make a Difference with Your Donation`}
        subTitle={`Every contribution helps provide care and shelter for pets in need. Donate and make a difference today!`}
      />

      {/* donation campaign container */}
      <div className="w-11/12 mx-auto my-12 md:my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        <DonationPetCard />
        <DonationPetCard />
        <DonationPetCard />
        <DonationPetCard />
        <DonationPetCard />
        <DonationPetCard />
      </div>
    </section>
  );
};

export default DonationCampaigns;
