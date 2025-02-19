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
import { FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get donation campaigns
  const { data: myDonationCampaigns = [], refetch, isLoading } = useQuery({
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

  //handle status change
  const handleStatus = async (id, status) => {
    try {
      const newStatus = status === "Active" ? "Pause" : "Active";
      const { data } = await axiosSecure.patch(`/donation-status/${id}`, {
        status: newStatus,
      });

      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Donation ${newStatus === "Pause" ? "Paused" : "Unpaused"}`,
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if(isLoading) return <Skeleton count={5}></Skeleton>

  return (
    <section className="my-12">
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
              <TableCell>${campaign.maxAmount}</TableCell>
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
              <TableCell className="flex items-center gap-3">
                <Link to={`/dashboard/editDonationCampaigns/${campaign._id}`}>
                  <Button className="bg-primaryBlue">
                    <FilePenLine />
                  </Button>
                </Link>
                <Button
                  onClick={() => handleStatus(campaign._id, campaign.status)}
                  className={` ${
                    campaign.status === "Active" ? "bg-red-400" : "bg-green-400"
                  }`}
                >
                  {campaign.status === "Active" ? `Pause` : "Unpause"}
                </Button>
              </TableCell>
              <TableCell>
                <DonatorModalBtn campaignId={campaign._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default MyDonationCampaigns;
