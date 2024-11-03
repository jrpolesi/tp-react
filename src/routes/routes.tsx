import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Form,
  Home,
  NotFoundPage,
  PageLayout,
  Settings,
  SignInPage,
  SignUpPage,
} from "../views";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // protected routes
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "form",
            element: <Form />,
          },
        ],
      },
      // public routes
      {
        path: "/",
        element: <PublicRoute />,
        children: [
          {
            path: "/signin",
            element: <SignInPage />,
          },
          {
            path: "/signup",
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
