import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaInstagram, FaSpinner } from "react-icons/fa";
import authImg from "../assets/authentication/auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { imageUpload } from "@/api/utils";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

export function RegisterForm({ className, ...props }) {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Handle submit
  const onSubmit = async (data) => {
    const name = data?.name;
    const email = data?.email;
    const image = data?.photo[0];
    const password = data?.password;

    //Send image to imagebb
    const photoURL = await imageUpload(image);

    //create user
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);

      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      console.log(result.user);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err?.code}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  //Handle Google signUp
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      console.log(user);
      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err?.code}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome To Pet Hope</h1>
                <p className="text-balance text-muted-foreground">
                  Register to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="picture">Your Image</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white dark:bg-black"
                  {...register("email", { required: true })}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    Email field is required.
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="bg-white dark:bg-black"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-sm">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-sm">
                    Password must be 6 characters.
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 text-sm">
                    Password must be less than 20 characters.
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-sm">
                    Password must have at least one uppercase, one lowercase,
                    one number and one special character.
                  </p>
                )}
              </div>
              <Button type="submit" variant={`primary`} className="w-full">
                {loading ? (
                  <FaSpinner className="animate-spin m-auto"></FaSpinner>
                ) : (
                  "Register"
                )}
              </Button>
              {/* social login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white dark:bg-black px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGoogle />
                SignUp with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGithub />
                SignUp with GitHub
              </Button>

              {/* register link*/}
              <div className="text-center text-sm">
                Already have an account?
                <Link
                  to={`/authentication/login`}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
          {/* image part */}
          <div className="relative hidden bg-muted md:block">
            <img
              src={authImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* extra part */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
