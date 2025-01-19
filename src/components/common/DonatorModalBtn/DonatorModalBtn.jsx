import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Eye } from "lucide-react";
import { useQuery } from "react-query";

const DonatorModalBtn = ({ campaignId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get donations
  const { data: myDonations = [] } = useQuery({
    queryKey: ["myDonations", user?.email, campaignId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donator-list/${campaignId}`);
      return data;
    },
  });
  console.log(myDonations);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primaryBlue">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Donators</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {myDonations.length > 0 ? (
            myDonations.map((donation) => (
              <div key={donation._id}>
                <p>
                  <span className="font-medium mr-2">Donator:</span>
                  {donation.donator.name}:
                </p>
                <p className="text-sm">
                  <span className="font-medium mr-2">Donated Amount:</span>$
                  {donation.donationAmount}
                </p>
              </div>
            ))
          ) : (
            <p>No donation yet.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonatorModalBtn;
