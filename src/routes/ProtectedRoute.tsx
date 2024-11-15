import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts";

export function ProtectedRoute() {
  const { session } = useSessionContext();

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
