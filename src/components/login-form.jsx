import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaInstagram, FaSpinner } from "react-icons/fa";
import authImg from "../assets/authentication/auth.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { saveUser } from "@/api/utils";

export function LoginForm({ className, ...props }) {
  const { loading, loginUser, setLoading, signInWithGoogle, signInWithGithub } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   Handle login
  const onSubmit = async (data) => {
    const email = data?.email;
    const password = data?.password;

    try {
      await loginUser(email, password);
      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
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

  //Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle();
      //save user info in db
      await saveUser(data?.user);

      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
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

  //Handle Github login
  const handleGithubLogin = async () => {
    try {
      const data = await signInWithGithub();
      console.log(data);
      //save user info in db
      await saveUser(data?.user);

      //show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
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
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  className="bg-white dark:bg-black"
                  {...register("password", { required: true })}
                  required
                />
              </div>
              <Button variant={`primary`} type="submit" className="w-full">
                {loading ? (
                  <FaSpinner className="animate-spin m-auto"></FaSpinner>
                ) : (
                  "Login"
                )}
              </Button>
              {/* social login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white dark:bg-black px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button
                onClick={handleGoogleLogin}
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGoogle />
                Login with Google
              </Button>
              <Button
                onClick={handleGithubLogin}
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGithub />
                Login with GitHub
              </Button>

              {/* register link*/}
              <div className="text-center text-sm">
                Don&apos;t have an account?
                <Link
                  to={`/authentication/register`}
                  className="underline underline-offset-4"
                >
                  Sign up
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
