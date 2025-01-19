import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { imageUpload } from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateDonationCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  // Handle submit
  const onSubmit = async (data) => {
    const photo = data?.photo[0];

    //send image to imagebb
    const photoURL = await imageUpload(photo);

    //donation campaign asker info
    const askerInfo = {
      name: user?.displayName,
      email: user?.email,
    };

    //donation campaign data
    const donationData = {
      petName: data?.name,
      petImage: photoURL,
      maxAmount: parseFloat(data?.maxAmount),
      lastDate: data?.lastDonationDate,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription,
      donatedAmount: parseFloat(0),
      status: "Active",
      askerInfo,
    };

    //save data in db
    try {
      const { data } = await axiosSecure.post(
        "/donation-campaigns",
        donationData
      );
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Donation Campaign added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-11/12 mx-auto my-5">
      {/* add pet form */}
      <div>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    Create Donation Campaign
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Create a donation campaign for pitty pets!
                  </p>
                </div>

                {/* pet name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Pet Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Pet Name"
                    className="bg-white dark:bg-black"
                    {...register("name", { required: true })}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">Name is required.</p>
                  )}
                </div>
                {/* image */}
                <div className="grid gap-2">
                  <Label htmlFor="picture">Pet Image</Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="bg-white dark:bg-black"
                    {...register("photo", { required: true })}
                    required
                  />
                  {errors.photo && (
                    <p className="text-sm text-red-600">Photo is required.</p>
                  )}
                </div>
                {/* max amount */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Maximum Donation Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="Maximum Donation Amount"
                    className="bg-white dark:bg-black"
                    {...register("maxAmount", { required: true })}
                    required
                  />
                  {errors.maxAmount && (
                    <p className="text-sm text-red-600">
                      Maximum amount field is required.
                    </p>
                  )}
                </div>
                {/* last donation date  */}
                <div className="lg:col-span-2 grid gap-2">
                  <Label htmlFor="location">Last date of donation</Label>
                  <Controller
                    name="lastDonationDate"
                    control={control}
                    rules={{ required: "Last donation date is required" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "bg-white dark:bg-black"
                            )}
                          >
                            <CalendarIcon className="mr-2" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.lastDonationDate && (
                    <p className="text-red-500 text-sm">
                      {errors.lastDonationDate?.message}
                    </p>
                  )}
                </div>
                {/* short description */}
                <div className="grid gap-2">
                  <Label htmlFor="location">Short Description</Label>
                  <Textarea
                    id="short-description"
                    placeholder="Short description"
                    className="bg-white dark:bg-black"
                    {...register("shortDescription", { required: true })}
                    required
                  />
                  {errors.shortDescription && (
                    <p className="text-sm text-red-600">
                      Short Description field is required.
                    </p>
                  )}
                </div>
                {/* long description */}
                <div className="grid gap-2">
                  <Label htmlFor="location">Long Description</Label>
                  <Textarea
                    id="long-description"
                    placeholder="Long description"
                    className="bg-white dark:bg-black"
                    {...register("longDescription", { required: true })}
                    required
                  />
                  {errors.longDescription && (
                    <p className="text-sm text-red-600">
                      Long Description field is required.
                    </p>
                  )}
                </div>
                <Button type="submit" variant={`primary`} className="w-full">
                  Create Donation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateDonationCampaign;
