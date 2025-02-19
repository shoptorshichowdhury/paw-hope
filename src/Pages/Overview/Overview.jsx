import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { BellRing, BriefcaseBusiness, DollarSign, FilePlus2, PieChart } from "lucide-react";
import { useQuery } from "react-query";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get donation campaigns
  const { data: stats = [] } = useQuery({
    queryKey: ["stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/overview-stats/${user?.email}`);
      return data;
    },
  });

  return (
    <section className="my-5">
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* my added pets */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Total Added Pets</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats.totalPets}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <FilePlus2 />
          </div>
        </div>
        {/* my donation campaigns */}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Total Donation Campaigns</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats?.myDonationCampaigns}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
            <BriefcaseBusiness />
          </div>
        </div>
        {/* my total donations*/}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>My Total Donations</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              ${stats?.totalDonations}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
          <DollarSign />
          </div>
        </div>
        {/* adoption requests for my pets*/}
        <div className="bg-white p-5 rounded-xl flex justify-between items-start shadow-md">
          <div className="space-y-2">
            <h3>Adoption Requests</h3>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium">
              {stats?.myAdoptionRequests}
            </p>
          </div>
          <div className="p-3 bg-primaryBlue/50 w-max rounded-full">
          <BellRing />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
