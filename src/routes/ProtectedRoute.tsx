import { Navigate, Outlet } from "react-router-dom";
import { Box, CentralizedSpinner } from "../components";
import { useSessionContext } from "../contexts";

export function ProtectedRoute() {
  const { session, isLoading } = useSessionContext();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CentralizedSpinner
          sx={{
            minHeight: "100vh",
          }}
          spinnerProps={{
            size: 40,
          }}
        />
      </Box>
    );
  }

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
