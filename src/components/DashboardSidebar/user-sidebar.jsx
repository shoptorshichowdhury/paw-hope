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
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

export function UserSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row items-center justify-start md:py-5">
        <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-center">
          User DashBoard
        </h3>
      </SidebarHeader>
      <SidebarContent className="sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* all menu */}
            <SidebarMenu>
              {/* 1. add a pet */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/dashboard" end>
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
                  <NavLink className="font-medium" to="/">
                    My Donation Campaigns
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 5. My donations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/">
                    My Donations
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 6. donation request */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink className="font-medium" to="/">
                    Donation Request
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
