import { Navigate, Outlet } from "react-router-dom";
import { useSessionContext } from "../contexts";

export function PublicRoute() {
  const { session } = useSessionContext();

  if (session) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
