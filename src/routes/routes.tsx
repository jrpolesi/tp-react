import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardPage,
  FormPage,
  HomePage,
  NotFoundPage,
  PageLayout,
  SettingsPage,
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
            element: <HomePage />,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/form",
            element: <FormPage />,
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
