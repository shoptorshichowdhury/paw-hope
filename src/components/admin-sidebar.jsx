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
import { Link } from "react-router-dom";

export function AdminSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row items-center justify-center md:py-5">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-center">
          Admin DashBoard
        </h3>
      </SidebarHeader>
      <SidebarContent>
        {/* additional users route */}
        <SidebarGroup>
          <SidebarGroupContent>
            {/* all menu */}
            <SidebarMenu>
              {/* 1. add a pet */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    Add a Pet
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 2. my added pets */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    My added pets
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 3. adoption request */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    My added pets
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 4. create donation campaign */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    Create Donation Campaign
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 5. my donation campaigns */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    My Donation Campaigns
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 6. My donations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    My Donations
                  </Link>
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
                  <Link className="font-medium" to="/">
                    Users
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 2. All pets */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    All Pets
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* 3. all donations */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link className="font-medium" to="/">
                    All Donations
                  </Link>
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
