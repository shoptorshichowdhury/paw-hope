import useAuth from "@/hooks/useAuth";
import profileBg from "../../assets/banner/profile-paw.jpg";
import { useQuery } from "react-query";
import { BriefcaseBusiness, PawPrint } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //Get all added pets
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pets/${user?.email}`);
      return data.map((pet, index) => ({ ...pet, serial: index + 1 }));
    },
  });

  //get donation campaigns
  const { data: myDonationCampaigns = [] } = useQuery({
    queryKey: ["myDonationCampaigns", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-donation-campaigns/${user?.email}`
      );
      return data.map((campaign) => ({
        ...campaign,
        progressPercentage: Math.min(
          (campaign.donatedAmount / campaign.maxAmount) * 100,
          100
        ),
      }));
    },
  });

  return (
    <section className="my-5">
      {/* profile background section  */}
      <div
        className="h-20 md:h-32 lg:h-52 rounded-xl bg-center bg-cover"
        style={{ backgroundImage: `url(${profileBg})` }}
      ></div>
      {/* profile picture */}
      <div className="flex justify-center items-center -translate-y-12 md:-translate-y-16 lg:-translate-y-20">
        <div className="bg-white dark:bg-black w-20 h-20 md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] rounded-full border-2 border-primaryBlue p-[2px] md:p-1">
          <img
            className="w-full h-full rounded-full object-cover"
            src={user?.photoURL}
            referrerPolicy="no-referrer"
            alt="profile"
          />
        </div>
      </div>
      {/* personal info & stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 -translate-y-8">
        {/*-- info --*/}
        <div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Personal Info:
            </h3>
            <div className="flex items-center gap-3 p-3 md:p-5 bg-white dark:bg-black rounded-md">
              <div className="font-medium space-y-3">
                <h3>Name:</h3>
                <h3>Email:</h3>
                <h3>Phone:</h3>
                <h3>Address:</h3>
              </div>
              <div className="space-y-3">
                <h3>{user?.displayName}</h3>
                <h3>{user?.email}</h3>
                <h3>01900000</h3>
                <h3>Dhaka, Bangladesh</h3>
              </div>
            </div>
          </div>
        </div>

        {/*-- stats-- */}
        <div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Overview:
            </h3>
            <div className="flex flex-col gap-5 p-3 md:p-5 bg-white dark:bg-black rounded-md">
              {/* pets */}
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-primaryBlue w-max p-2">
                  <PawPrint size={32} />
                </div>
                <div>
                  <h4>Total Added Pets</h4>
                  <p className="text-xl md:text-2xl font-medium">
                    {pets && pets.length}
                  </p>
                </div>
              </div>
              {/* donations */}
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-primaryBlue w-max p-2">
                  <BriefcaseBusiness size={32} />
                </div>
                <div>
                  <h4>Total Donation Campaigns</h4>
                  <p className="text-xl md:text-2xl font-medium">
                    {myDonationCampaigns && myDonationCampaigns.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
