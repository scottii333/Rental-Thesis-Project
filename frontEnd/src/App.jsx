import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminDashboard } from "./AdminSide/AdminDashboard";
import { MainHeader } from "./Components/MainHeader";
import { Homepage } from "./Components/Homepage";
import { MainFooter } from "./Components/MainFooter";
import { AddVan } from "./AdminSide/AddVan";
import { VanPreview } from "./AdminSide/VanPreview";
import { AdminApproved } from "./AdminSide/AdminApproved";
import { AdminPending } from "./AdminSide/AdminPending";
import { AdminRejected } from "./AdminSide/AdminRejected";
import { AdminLogIn } from "./AdminSide/AdminLogIn";
import { ErrorPage } from "./Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="bg-mainBackgroundColor bg-no-repeat bg-cover h-auto w-full min-h-[100dvh] pb-[10rem]">
        <MainHeader />
        <Homepage />
        <MainFooter />
      </div>
    ),
    errorElement: <ErrorPage />, // Handles errors for this route
  },
  {
    path: "/admin-auth",
    element: <AdminLogIn />,
    errorElement: <ErrorPage />, // Handles errors for this route
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />, // Handles errors for this route
    children: [
      {
        path: "",
        element: (
          <div>
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Select an option from the left menu to get started.</p>
          </div>
        ),
      },
      {
        path: "addVan",
        element: <AddVan />,
      },
      {
        path: "viewVans",
        element: <VanPreview />,
      },
      {
        path: "approved",
        element: <AdminApproved />,
      },
      {
        path: "pending",
        element: <AdminPending />,
      },
      {
        path: "rejected",
        element: <AdminRejected />,
      },
      {
        path: "logout",
        element: (
          <div>
            <h1>Logout</h1>
            <p>You have successfully logged out.</p>
          </div>
        ),
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
