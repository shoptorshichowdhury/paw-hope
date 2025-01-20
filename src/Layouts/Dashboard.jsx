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
  console.log(role);
 
  return (
    <SidebarProvider>
      {role === 'admin' ? <AdminSidebar /> : <UserSidebar />}
      <SidebarInset>
        <header className="flex items-center gap-2 border-b">
          <SidebarTrigger className="ml-2" />
          <div className="w-full">
            <Navbar></Navbar>
          </div>
        </header>

        {/* outlet content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
