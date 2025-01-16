import { UserSidebar } from "@/components/user-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { AdminSidebar } from "@/components/admin-sidebar";

const Dashboard = () => {
  const admin = true;

  return (
    <SidebarProvider>
      {admin ? <AdminSidebar /> : <UserSidebar />}
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
            <h3>Hello!</h3>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard;
