import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import logo from "../../../assets/icons/smallicon.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  return (
    <div className="sticky top-0 bg-opacity-45 backdrop-blur-lg border border-b-slate-300/30">
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
            <NavigationMenuList className="hidden md:flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="hover:underline">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="hover:underline">
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact" className="hover:underline">
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* navbar menu small screen */}
          {/* hamburger icon */}
          <button
            className="md:hidden p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsMobileMenu(!isMobileMenu)}
          >
            <HiMenuAlt3 className="text-xl" />
          </button>
          {/* menu navbar mobile */}
          {isMobileMenu && (
            <div className="md:hidden bg-white border rounded-lg absolute px-6 top-11 left-2 z-50">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col items-end space-y-2 py-4 text-sm font-medium">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/" className="hover:underline">
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/about"
                      className="hover:underline"
                    >
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/contact"
                      className="hover:underline"
                    >
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          {/* login button */}
          <Button variant={`primary`}>Login</Button>

          {/* theme toggle */}
          <ModeToggle></ModeToggle>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
