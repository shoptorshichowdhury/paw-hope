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
import { isAfter } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DonationFormButton = ({ donationData }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    petName,
    petImage,
    maxAmount,
    lastDate,
    donatedAmount,
    _id,
  } = donationData || {};

  // donation button functionality for user/non-user
  const handleButtonClick = () => {
    if (user) {
      setIsDialogOpen(true);
    } else {
      navigate("/authentication/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const donationAmount = parseFloat(e.target.donationAmount.value);

    // Check last date
    if (isAfter(new Date(), new Date(lastDate))) {
      return setError("This donation campaign has expired.");
    }

    // Check max amount
    if (donationAmount + donatedAmount > maxAmount) {
      return setError(
        `Donation amount exceeds the maximum allowed of ${maxAmount}.`
      );
    }

    // Check amount is not 0
    if (donationAmount <= 0) {
      return setError("Donation amount must be greater than zero.");
    }

    const donator = {
      name: user?.displayName,
      email: user?.email,
    };
    const donationInfo = {
      campaignId: _id,
      donationAmount,
      petName,
      petImage,
      donator,
    };

    //save donation data in db
    try {
      const { data } = await axiosSecure.post(`/donations`, donationInfo);

      //send request to update donated amount
      await axiosSecure.patch(`/donation-campaign/donatedAmount/${_id}`, {
        donationAmount,
        status: "increase",
      });

      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Donation added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" onClick={handleButtonClick}>
          Donate Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            Donation dao
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* donation amount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username">Donation Amount</Label>
              <Input
                type="number"
                id="donation-amount"
                name="donationAmount"
                placeholder="Donation Amount"
                className="col-span-3"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant={`cardBtn`} type="submit">
              Donate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationFormButton;
