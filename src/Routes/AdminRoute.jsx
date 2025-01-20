import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <p>loading....</p>;
  if (role === "admin") return children;

  return <Navigate to="/dashboard" replace="true"></Navigate>;
};

export default AdminRoute;
