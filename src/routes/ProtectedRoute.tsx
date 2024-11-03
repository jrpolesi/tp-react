import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../shared";

export function ProtectedRoute() {
  const { session } = useSessionContext();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
