import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdoptFormButton = ({ petData }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // adopt button functionality for user/non-user
  const handleButtonClick = () => {
    if (user) {
      setIsDialogOpen(true);
    } else {
      navigate("/authentication/login");
    }
  };

  const {
    photo,
    name,
    age,
    category,
    location,
    shortDescription,
    longDescription,
    _id,
    petOwner,
  } = petData || {};

  //adoption request submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const userPhone = form.phone.value;
    const userAddress = form.address.value;
    const userInfo = {
      name: user?.displayName,
      email: user?.email,
      phoneNumber: userPhone,
      address: userAddress,
    };

    const adoptionRequestData = {
      petId: _id,
      petName: name,
      petImage: photo,
      userInfo,
      petOwnerInfo: petOwner?.email,
    };

    //Send adoption request to db
    try {
      const { data } = await axiosSecure.post(
        `/adoption-requests`,
        adoptionRequestData
      );
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Adoption Request Sent!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog>
      <Button variant="primary" onClick={handleButtonClick}>
        Adopt Me
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95%] sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl">{name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* pet id */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="font-medium">Pet ID:</Label>
                <p className="col-span-3">{_id}</p>
              </div>
              {/* pet name */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="font-medium">Pet Name:</Label>
                <p className="col-span-3">{name}</p>
              </div>
              {/* pet image */}
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label className="font-medium">Pet Image:</Label>
                <p className="col-span-3">{photo}</p>
              </div>
              {/* user name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">User Name</Label>
                <Input
                  id="name"
                  defaultValue={user?.displayName}
                  className="col-span-3"
                  disabled
                />
              </div>
              {/* user email */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="useremail"
                  defaultValue={user?.email}
                  className="col-span-3"
                  disabled
                />
              </div>
              {/* user phone number */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username">Phone Number</Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  name="phone"
                  defaultValue="01817000000"
                  className="col-span-3"
                />
              </div>
              {/* address */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue="Dhaka"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant={`cardBtn`} type="submit">
                Adopt
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default AdoptFormButton;
