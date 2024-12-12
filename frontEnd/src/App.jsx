import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminDashboard } from "./AdminSide/AdminDashboard";
import { MainHeader } from "./Components/MainHeader";
import { Homepage } from "./Components/Homepage";
import { MainFooter } from "./Components/MainFooter";
import { AddVan } from "./AdminSide/AddVan";
import { VanPreview } from "./AdminSide/VanPreview";
import { AdminApproved } from "./AdminSide/AdminApproved";
import { AdminLogIn } from "./AdminSide/AdminLogIn";
import { ErrorPage } from "./Components/ErrorPage";
import { AvailableVan } from "./Components/AvailableVan";
import { OrderDetails } from "./Components/OrderDetails";
import { OrderSummary } from "./Components/OrderSummary";
import { AdminHistory } from "./AdminSide/AdminHistory";
import { CustomerDashboard } from "./CustomerSide/CustomerDashboard";

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
    path: "/availableVan",
    element: <AvailableVan />,
    errorElement: <ErrorPage />, // Handles errors for this route
  },
  {
    path: "/orderDetails",
    element: <OrderDetails />,
    errorElement: <ErrorPage />, // Handles errors for this route
  },
  {
    path: "/orderSummary",
    element: <OrderSummary />,
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
        path: "history",
        element: <AdminHistory />,
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
  {
    path: "/customer",
    element: <CustomerDashboard />,
    errorElement: <ErrorPage />, // Handles errors for this route
  },
]);

export const App = () => <RouterProvider router={router} />;
