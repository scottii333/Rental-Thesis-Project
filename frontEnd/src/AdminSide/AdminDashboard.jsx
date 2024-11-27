import { AdminHeader } from "./AdminHeader";
import EasyDriveCarIcon from "../Images/EasyDriveCarIcon.png";
import { NavLink, Outlet } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-mainBackgroundColor bg-no-repeat bg-cover flex flex-col text-[1.5rem] text-white p-[1.5rem] gap-[2rem] text-center w-[30%] h-[120dvh]">
          <h2 className="flex justify-center gap-[1rem]">
            <img
              src={EasyDriveCarIcon}
              className="w-[2rem] filter invert brightness-0"
              alt="EasyDrive Icon"
            />
            Van Management
          </h2>
          <NavLink
            to="addVan"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            Add a Van
          </NavLink>
          <NavLink
            to="viewVans"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            View Vans
          </NavLink>

          <h2 className="flex justify-center gap-[1rem]">
            <img
              src={EasyDriveCarIcon}
              className="w-[2rem] filter invert brightness-0"
              alt="EasyDrive Icon"
            />
            Approval Management
          </h2>
          <NavLink
            to="approved"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            Approved
          </NavLink>
          <NavLink
            to="pending"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            Pending
          </NavLink>
          <NavLink
            to="rejected"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            Rejected
          </NavLink>
          <NavLink
            to="logout"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black transition ease-in-out duration-500"
                : "rounded-md hover:bg-white hover:text-black transition ease-in-out duration-500"
            }
          >
            Log Out
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="w-[70%] min-h-[90dvh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
