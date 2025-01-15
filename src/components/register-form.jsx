import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGithub, FaGoogle, FaInstagram } from "react-icons/fa";
import authImg from "../assets/authentication/auth.jpg";
import { Link } from "react-router-dom";

export function RegisterForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
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
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="picture">Your Image</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="bg-white dark:bg-black"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white dark:bg-black"
                  required
                />
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
                  required
                />
              </div>
              <Button variant={`primary`} type="submit" className="w-full">
                Register
              </Button>
              {/* social login */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-white dark:bg-black px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGoogle />
                SignUp with Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white dark:bg-black"
              >
                <FaGithub />
                SignUp with GitHub
              </Button>

              {/* register link*/}
              <div className="text-center text-sm">
                Already have an account?
                <Link to={`/authentication/login`} className="underline underline-offset-4">
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
