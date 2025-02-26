import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";
import { ChartLine, User } from "lucide-react";

export function AdminSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row items-center justify-center md:py-5">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
          Admin DashBoard
        </h3>
      </SidebarHeader>
      <SidebarContent className="sidebar">
        {/* profile & overview */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* 1. overview */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard" end>
                    <ChartLine /> Overview
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 2. my profile */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    className="font-medium"
                    to="/dashboard/myProfile"
                    end
                  >
                    <User /> My Profile
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        {/* additional users route */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* all menu */}
            <SidebarMenu>
              {/* 1. add a pet */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/addPet" end>
                    Add a Pet
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 2. my added pets */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/myAddedPets">
                    My added pets
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 3. create donation campaign */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    className="font-medium"
                    to="/dashboard/createDonationCampaign"
                  >
                    Create Donation Campaign
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 4. my donation campaigns */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    className="font-medium"
                    to="/dashboard/myDonationCampaigns"
                  >
                    My Donation Campaigns
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 5. My donations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/myDonations">
                    My Donations
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 6. donation request */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    className="font-medium"
                    to="/dashboard/adoptionRequest"
                  >
                    Adoption Request
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        {/* admin special routes */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* all menu */}
            <SidebarMenu>
              {/* 1. users */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/allUsers">
                    Users
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 2. All pets */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/allPets">
                    All Pets
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 3. all donations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard/allDonations">
                    All Donations
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
