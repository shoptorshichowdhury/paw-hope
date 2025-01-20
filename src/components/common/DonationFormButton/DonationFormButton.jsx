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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationFormButton = ({ donationData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [donationValue, setDonationValue] = useState(1);

  const { petName, petImage, maxAmount, lastDate, donatedAmount, _id } =
    donationData || {};

  // donation button functionality for user/non-user
  const handleButtonClick = () => {
    if (user) {
      setIsDialogOpen(true);
    } else {
      navigate("/authentication/login");
    }
  };

  // Validate input using useEffect
  useEffect(() => {
    // Check last date
    if (isDialogOpen && isAfter(new Date(), new Date(lastDate))) {
      setError("This donation campaign has expired.");
      return;
    }

    // Check max amount
    if (isDialogOpen && donationValue + donatedAmount > maxAmount) {
      setError(`Donation amount exceeds the maximum allowed of ${maxAmount}.`);
      return;
    }

    // Check amount is not 0
    if (isDialogOpen && donationValue <= 0) {
      setError("Donation amount must be greater than zero.");
      return;
    }

    setError("");
  }, [isDialogOpen, donationValue, lastDate, maxAmount, donatedAmount]);

  const donator = {
    name: user?.displayName,
    email: user?.email,
  };

  const donationInfo = {
    campaignId: _id,
    donationAmount: donationValue,
    petName,
    petImage,
    donator,
  };

//   const handleSubmit = async () => {
    
//   };

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
        <div className="grid gap-4 py-4">
          {/* donation amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Donation Amount</Label>
            <Input
              type="number"
              id="donation-amount"
              value={donationValue}
              onChange={(e) => setDonationValue(parseFloat(e.target.value))}
              placeholder="Donation Amount"
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Checkout form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm
            donationData={donationData}
              donationInfo={donationInfo}
              setIsDialogOpen={setIsDialogOpen}
              refetch={refetch}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationFormButton;
