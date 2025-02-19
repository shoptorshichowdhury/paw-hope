import { UserSidebar } from "@/components/DashboardSidebar/user-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { AdminSidebar } from "@/components/DashboardSidebar/admin-sidebar";
import { Outlet } from "react-router-dom";
import useRole from "@/hooks/useRole";

const Dashboard = () => {
  const [role, isLoading] = useRole();
 
  return (
    <SidebarProvider>
      {role === "admin" ? <AdminSidebar /> : <UserSidebar />}
      <SidebarInset>
        <header className="flex items-center gap-2 border-b">
          <SidebarTrigger className="ml-2" />
          <div className="w-full">
            <Navbar></Navbar>
          </div>
        </header>

        {/* outlet content */}
        <section className="w-11/12 lg:max-w-6xl mx-auto">
          <Outlet></Outlet>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
