import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DonatorModalBtn from "@/components/common/DonatorModalBtn/DonatorModalBtn";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

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
    <section className="w-11/12 mx-auto my-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Name</TableHead>
            <TableHead>Maximum Donation Amount</TableHead>
            <TableHead>Donation Progress Bar</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>View Donators</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myDonationCampaigns.map((campaign) => (
            <TableRow key={campaign._id}>
              <TableCell>{campaign.petName}</TableCell>
              <TableCell> {campaign.maxAmount}</TableCell>
              <TableCell>
                <Progress
                  className={`h-2 rounded-lg text-blue-500 ${
                    campaign.progressPercentage < 30
                      ? "bg-red-500"
                      : campaign.progressPercentage < 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  value={campaign.progressPercentage}
                />
                <span>{Math.round(campaign.progressPercentage)}%</span>
              </TableCell>
              <TableCell className="space-x-2 grid grid-cols-2">
                <Button
                  className={`col-span-1 ${
                    campaign.status === "Active" ? "bg-red-400" : "bg-green-400"
                  }`}
                >
                  {campaign.status === "Active" ? `Pause` : "Unpause"}
                </Button>
                <Button className="bg-primaryBlue col-span-1">Edit</Button>
              </TableCell>
              <TableCell>
                <DonatorModalBtn />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default MyDonationCampaigns;
