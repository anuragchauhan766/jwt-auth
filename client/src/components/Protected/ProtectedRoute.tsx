import { useAuth } from "@context/AuthContext";

import { Outlet, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/auth/signin" replace={true} />;
};

export default ProtectedRoute;
