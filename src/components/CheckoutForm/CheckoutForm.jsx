import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({
  donationInfo,
  donationData,
  setIsDialogOpen,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    getPaymentIntent();
  }, [donationInfo]);
  console.log(clientSecret);
  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        donationAmount: donationInfo?.donationAmount,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    setProcessing(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcessing(false);
      return console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    //confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: donationInfo?.donator?.name,
          email: donationInfo?.donator?.email,
        },
      },
    });

    if (paymentIntent.status === "succeeded") {
      //save donation data in db
      try {
        const { data } = await axiosSecure.post(`/donations`, donationInfo);
        //send request to update donated amount
        await axiosSecure.patch(
          `/donation-campaign/donatedAmount/${donationData?._id}`,
          {
            donationAmount: donationInfo?.donationAmount,
            status: "increase",
          }
        );
        //show success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Donation added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
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
        setProcessing(false)
        setIsDialogOpen(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button type="submit" variant={`cardBtn`} disabled={!stripe || !clientSecret || processing}>
        {donationInfo.donationAmount > 0
          ? `Donate $${donationInfo?.donationAmount}`
          : `Donate`}
      </Button>
    </form>
  );
};

export default CheckoutForm;
