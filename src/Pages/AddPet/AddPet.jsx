import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import Select from "react-select";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@/components/theme-provider";
import Tiptap from "@/components/Tiptap/Tiptap";
import { imageUpload } from "@/api/utils";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";

//category options
const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
];

// Function to determine if system theme is dark
const isSystemDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// Custom select styles
const customSelectStyles = (theme) => {
  const isDarkMode = theme === "dark" || (theme === "system" && isSystemDark());

  return {
    control: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#000000" : "#fff",
      borderColor: isDarkMode ? "#1E293B" : "#ccc",
      color: isDarkMode ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "#000"
          : "#ddd"
        : "transparent",
      color: isDarkMode ? "#fff" : "#000",
      ":hover": {
        backgroundColor: isDarkMode ? "#555" : "#eee",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#333" : "#fff",
    }),
    placeholder: (base) => ({
      ...base,
      color: isDarkMode ? "#ddd" : "#777",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
  };
};

const AddPet = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Handle submit
  const onSubmit = async (data) => {
    const image = data?.photo[0];
    //send image to imagebb
    const photoURL = await imageUpload(image);

    //pet owner info
    const petOwner = {
      name: user?.displayName,
      email: user?.email,
    };

    const petData = {
      photo: photoURL,
      name: data?.name,
      price: parseFloat(data?.price),
      age: data?.age,
      category: data?.category?.value,
      location: data?.location,
      shortDescription: data?.shortDescription,
      longDescription: data?.longDescription,
      petOwner,
    };

    try {
      //add a pet in db
      const { data } = await axiosSecure.post("/pets", petData);
      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Pet added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="my-5">
      {/* add pet form */}
      <div>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Add a pet</h1>
                  <p className="text-balance text-muted-foreground">
                    Add a pet for adoption!
                  </p>
                </div>
                {/* name & price container */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                  {/* name */}
                  <div className="lg:col-span-2 grid gap-2">
                    <Label htmlFor="name">Pet Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      className="bg-white dark:bg-black"
                      {...register("name", { required: true })}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        Name field is required.
                      </p>
                    )}
                  </div>
                  {/* fee */}
                  <div className="lg:col-span-2 grid gap-2">
                    <Label htmlFor="name">Rehoming Fee</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Fee"
                      className="bg-white dark:bg-black"
                      {...register("price", { required: true })}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        Price field is required.
                      </p>
                    )}
                  </div>
                </div>
                {/* image & age cotainer */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                  {/* image */}
                  <div className="lg:col-span-2 grid gap-2">
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
                  {/* age */}
                  <div className="lg:col-span-2 grid gap-2">
                    <Label htmlFor="name">Age</Label>
                    <Input
                      id="age"
                      type="text"
                      placeholder="Age"
                      className="bg-white dark:bg-black"
                      {...register("age", { required: true })}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        Name field is required.
                      </p>
                    )}
                  </div>
                </div>
                {/* category & location container */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                  {/* category */}
                  <div className="lg:col-span-2 grid gap-2">
                    <Label htmlFor="name">Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      defaultValue={null}
                      rules={{ required: "Category is required." }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          styles={customSelectStyles(theme)}
                          isClearable
                          value={field.value}
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  {/* location */}
                  <div className="lg:col-span-2 grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="Location"
                      className="bg-white dark:bg-black"
                      {...register("location", { required: true })}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">
                        Name field is required.
                      </p>
                    )}
                  </div>
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
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      Name field is required.
                    </p>
                  )}
                </div>
                {/* Long description */}
                <div className="grid gap-2">
                  <Label htmlFor="location">Long Description</Label>
                  {/* here tiptap component */}
                  <Controller
                    name="longDescription"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Long description is required.",
                      validate: (value) =>
                        value.trim() !== "" ||
                        "Long description cannot be empty.",
                    }}
                    render={({ field }) => (
                      <Tiptap value={field.value} onChange={field.onChange} />
                    )}
                  />
                  {errors.longDescription && (
                    <p className="text-sm text-red-600">
                      {errors.longDescription.message}
                    </p>
                  )}
                </div>
                <Button type="submit" variant={`primary`} className="w-full">
                  Add Pet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AddPet;
