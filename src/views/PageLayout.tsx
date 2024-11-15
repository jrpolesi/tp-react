import { Outlet } from "react-router-dom";
import { Container } from "../components";

export function PageLayout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
