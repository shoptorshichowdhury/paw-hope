import useAuth from "@/hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Skeleton count={10}></Skeleton>;
  if (user) return children;

  return (
    <Navigate
      to="/authentication/login"
      state={{ from: location }}
      replace="true"
    ></Navigate>
  );
};

export default PrivateRoute;
