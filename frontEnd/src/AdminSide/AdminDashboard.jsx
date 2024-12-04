import { AdminHeader } from "./AdminHeader";
import EasyDriveCarIcon from "../Images/EasyDriveCarIcon.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/"); // Redirect to base URL
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-mainBackgroundColor bg-no-repeat bg-cover flex flex-col text-white p-4 md:p-6 gap-4 md:gap-6 text-center w-[30%] h-auto md:h-[120dvh]">
          <h2 className="flex justify-center gap-2 items-center">
            <img
              src={EasyDriveCarIcon}
              className="w-5 sm:w-8 md:w-10 lg:w-12 filter invert brightness-0"
              alt="EasyDrive Icon"
            />
            <span className="text-[10px] sm:text-base md:text-lg lg:text-xl font-medium">
              Van Management
            </span>
          </h2>
          <NavLink
            to="addVan"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
                : "rounded-md hover:bg-white hover:text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
            }
          >
            Add a Van
          </NavLink>
          <NavLink
            to="viewVans"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
                : "rounded-md hover:bg-white hover:text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
            }
          >
            View Vans
          </NavLink>

          <h2 className="flex justify-center gap-2 items-center">
            <img
              src={EasyDriveCarIcon}
              className="w-5 sm:w-8 md:w-10 lg:w-12 filter invert brightness-0"
              alt="EasyDrive Icon"
            />
            <span className="text-[10px] sm:text-base md:text-lg lg:text-xl font-medium">
              Approval Management
            </span>
          </h2>
          <NavLink
            to="approved"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
                : "rounded-md hover:bg-white hover:text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
            }
          >
            Approved
          </NavLink>
          <NavLink
            to="pending"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
                : "rounded-md hover:bg-white hover:text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
            }
          >
            Pending
          </NavLink>
          <NavLink
            to="rejected"
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-white text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
                : "rounded-md hover:bg-white hover:text-black text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 flex items-center justify-center"
            }
          >
            Rejected
          </NavLink>
          <button
            onClick={handleLogout}
            className="rounded-md text-[10px] md:text-base lg:text-lg transition ease-in-out duration-500 py-2 px-4 text-white flex items-center justify-center"
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="w-[70%] min-h-[90dvh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
