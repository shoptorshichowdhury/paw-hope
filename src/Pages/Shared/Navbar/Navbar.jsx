import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import logo from "../../../assets/icons/paw-hope-logos/logo1.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className="sticky top-0 bg-opacity-90 backdrop-blur-md border-b border-b-slate-300/30 dark:border-b-slate-50/10 z-50">
      <nav className="py-3 w-11/12 mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 md:w-10 md:h-10">
            <img className="w-full h-full object-cover" src={logo} alt="logo" />
          </div>
          <span className="text-lg md:text-3xl font-semibold text-primaryBlue">
            Paw
            <span className="text-primaryPink font-scriptStatic lowercase text-2xl md:text-4xl font-semibold">
              Hope
            </span>
          </span>
        </div>

        {/* 2nd part of navbar */}
        <div className="flex justify-between items-center gap-3 md:gap-10 relative">
          {/* navbar menu large screen */}
          <NavigationMenu>
            <NavigationMenuList className="hidden lg:flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/" className="hover:underline">
                    Home
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/petListing" className="hover:underline">
                    Pet Listing
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink to="/donationCampaigns" className="hover:underline">
                    Donation Campaigns
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* navbar menu small screen */}
          {/* hamburger icon */}
          <button
            className="lg:hidden p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMobileMenu(!isMobileMenu)}
          >
            <HiMenuAlt3 className="text-xl" />
          </button>
          {/* menu navbar mobile */}
          {isMobileMenu && (
            <div className="lg:hidden bg-[#FFF5E1] dark:bg-[#2C3E50] border rounded-lg absolute px-6 top-11 left-2 z-50">
              <NavigationMenu>
                <NavigationMenuList
                  align="start"
                  className="flex flex-col items-start space-y-2 py-4 text-sm font-medium"
                >
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <NavLink to="/" className="hover:underline">
                        Home
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <NavLink to="/petListing" className="hover:underline">
                      Pet Listing
                    </NavLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to="/donationCampaigns"
                      className="hover:underline"
                    >
                      Donation Campaigns
                    </NavLink>
                  </NavigationMenuLink>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          {/* login button & user profile */}
          {/* login button */}
          {!user && (
            <Link to="/authentication/login">
              <Button variant={`primary`}>Login</Button>
            </Link>
          )}

          {/* user profile icon with dropdown menu*/}
          {user && (
            <DropdownMenu className="bg-[#FFF5E1] dark:bg-[#2C3E50] shadow-md p-2 space-y-2">
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full"
                  variant={`outline`}
                  size="icon"
                >
                  <div className="h-10 w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                      src={user?.photoURL}
                      alt="profile"
                    />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#FFF5E1] dark:bg-[#2C3E50] shadow-md rounded-md p-2"
              >
                <DropdownMenuItem className="focus:outline-none">
                  <Link to="/dashboard">
                    <Button variant="link">Dashboard</Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:outline-none">
                  <Button onClick={logOut} variant="link">
                    LogOut
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* theme toggle */}
          <ModeToggle></ModeToggle>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
