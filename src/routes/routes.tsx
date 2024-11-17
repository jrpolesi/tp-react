import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  DashboardPage,
  FormPage,
  FormUpdatePage,
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
    errorElement: <Navigate to="/not-found" />,
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
          {
            path: "/form/:itemId",
            element: <FormUpdatePage />,
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
      // not found
      {
        path: "/not-found",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
