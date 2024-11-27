import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminDashboard } from "./AdminSide/AdminDashboard";
import { MainHeader } from "./Components/MainHeader";
import { Homepage } from "./Components/Homepage";
import { MainFooter } from "./Components/MainFooter";
import { AddVan } from "./AdminSide/AddVan";

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
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
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
        element: (
          <div>
            <h1>View Vans</h1>
            <p>Here, you can see all the vans currently in the system.</p>
          </div>
        ),
      },
      {
        path: "approved",
        element: (
          <div>
            <h1>Approved Vans</h1>
            <p>Here are all the vans that have been approved.</p>
          </div>
        ),
      },
      {
        path: "pending",
        element: (
          <div>
            <h1>Pending Vans</h1>
            <p>Here are all the vans that are pending approval.</p>
          </div>
        ),
      },
      {
        path: "rejected",
        element: (
          <div>
            <h1>Rejected Vans</h1>
            <p>Here are all the vans that have been rejected.</p>
          </div>
        ),
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
