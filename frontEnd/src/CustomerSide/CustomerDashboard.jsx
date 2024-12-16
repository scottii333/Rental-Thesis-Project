import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { CustomerHeader } from "./CustomerHeader";

export const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("rentStatus"); // Default to Rent Status
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/"); // Redirect to base URL
    }
  };

  return (
    <div>
      <CustomerHeader />
      <div className="flex gap-1">
        {/* Sidebar */}
        <div className="flex flex-col h-[45rem] w-[30%] min-w-[10rem] bg-mainBackgroundColor text-white text-center pt-[5rem] gap-[1rem] items-center">
          <button
            className={`w-[95%] h-[2rem] rounded-md ${
              activeTab === "rentStatus"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={() => setActiveTab("rentStatus")}
          >
            Rent Status
          </button>
          <button
            className={`w-[95%] h-[2rem] rounded-md ${
              activeTab === "rentHistory"
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }`}
            onClick={() => setActiveTab("rentHistory")}
          >
            Rent History
          </button>
          <button
            className="w-[95%] h-[2rem] rounded-md hover:bg-white hover:text-black"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div className="h-[auto] w-[70%] ">
          {activeTab === "rentStatus" && (
            <div className=" h-[39rem] w-[100%]   text-center flex flex-col items-center justify-center   ">
              <div className=" w-[100%]    p-[1rem] h-[24rem] overflow-x-scroll flex gap-[1rem]   ">
                <div className="gap-[1rem] flex flex-shrink-0 flex-col  h-[20rem] w-[25rem] pt-[1rem] items-center p-[1rem] rounded-md shadow-md">
                  <h2>
                    <strong>Status:</strong> Verification on progress
                  </h2>
                  <h2>
                    <strong>Reference no:</strong> 0200319488
                  </h2>
                  <h3>
                    <strong>Van:</strong> Foton Trasnvan
                  </h3>
                  <h3>
                    <strong>Location:</strong> Caloocan
                  </h3>
                  <h3>
                    <strong>Pick-up</strong>11/26/2024
                  </h3>
                  <h3>
                    <strong>Return:</strong> 12/3/2024
                  </h3>
                  <h3>
                    <strong>Mobile no:</strong> 09918121869
                  </h3>
                </div>
                <div className="gap-[1rem] flex flex-shrink-0 flex-col  h-[20rem] w-[25rem] pt-[1rem] items-center p-[1rem] rounded-md shadow-md">
                  <h2>
                    <strong>Status:</strong> Verification on progress
                  </h2>
                  <h2>
                    <strong>Reference no:</strong> 0200319489
                  </h2>
                  <h3>
                    <strong>Van:</strong> Hyundai Trasnvan
                  </h3>
                  <h3>
                    <strong>Location:</strong> Cavite
                  </h3>
                  <h3>
                    <strong>Pick-up</strong> 12/5/2024
                  </h3>
                  <h3>
                    <strong>Return:</strong> 12/7/2024
                  </h3>
                  <h3>
                    <strong>Mobile no:</strong> 09917622623
                  </h3>
                </div>
                <div className="gap-[1rem] flex flex-shrink-0 flex-col  h-[20rem] w-[25rem] pt-[1rem] items-center p-[1rem] rounded-md shadow-md">
                  <h2>
                    <strong>Status:</strong> Verification on progress
                  </h2>
                  <h2>
                    <strong>Reference no:</strong> 0200319489
                  </h2>
                  <h3>
                    <strong>Van:</strong> Hyundai Trasnvan
                  </h3>
                  <h3>
                    <strong>Location:</strong> Cavite
                  </h3>
                  <h3>
                    <strong>Pick-up</strong> 12/5/2024
                  </h3>
                  <h3>
                    <strong>Return:</strong> 12/7/2024
                  </h3>
                  <h3>
                    <strong>Mobile no:</strong> 09917622623
                  </h3>
                </div>
                <div className="gap-[1rem] flex flex-shrink-0 flex-col  h-[20rem] w-[25rem] pt-[1rem] items-center p-[1rem] rounded-md shadow-md">
                  <h2>
                    <strong>Status:</strong> Verification on progress
                  </h2>
                  <h2>
                    <strong>Reference no:</strong> 0200319489
                  </h2>
                  <h3>
                    <strong>Van:</strong> Hyundai Trasnvan
                  </h3>
                  <h3>
                    <strong>Location:</strong> Cavite
                  </h3>
                  <h3>
                    <strong>Pick-up</strong> 12/5/2024
                  </h3>
                  <h3>
                    <strong>Return:</strong> 12/7/2024
                  </h3>
                  <h3>
                    <strong>Mobile no:</strong> 09917622623
                  </h3>
                </div>
              </div>
              <h2>Swipe to right</h2>
            </div>
          )}

          {activeTab === "rentHistory" && (
            <div className=" h-[39rem] m-[1rem]  flex items-center justify-center">
              <div className="  h-[35rem] p-[1rem] overflow-x-scroll flex flex-col shadow-md rounded-md   ">
                {/* Data Header */}
                <div className="flex gap-[1rem]  p-[1rem]  w-[80rem] bg-gray-100 h-[4rem] ">
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black font-bold text-gray-600">
                    Reference no
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black  font-bold text-gray-600">
                    Van
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black  font-bold text-gray-600">
                    Location
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black  font-bold text-gray-600">
                    Pick-Up
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black  font-bold text-gray-600">
                    Return
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black  font-bold text-gray-600">
                    Price
                  </h2>
                  <h2 className=" w-[10rem] text-center border-r-[1px] border-black font-bold text-gray-600">
                    Status
                  </h2>
                </div>

                {/* Data sample Rows */}
                <div className="flex gap-[1rem]  p-[1rem]  w-[80rem]  h-[4rem] ">
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    0200319488
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Foton Trasnvan
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Caloocan
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    11/26/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    12/3/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    2500
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center text-green-400 font-bold">
                    Completed
                  </h2>
                </div>
                <div className="flex gap-[1rem]  p-[1rem]  w-[80rem]  h-[4rem] ">
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    0200319489
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Hyundai Trasnvan
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Cavite
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    12/5/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    12/7/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    4500
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center text-orange-400 font-bold">
                    Rejected
                  </h2>
                </div>
                <div className="flex gap-[1rem]  p-[1rem]  w-[80rem]  h-[4rem] ">
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    0200319490
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Honda Trasnvan
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    Quezon
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    12/10/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    12/13/2024
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center">
                    3500
                  </h2>
                  <h2 className="border-r-[1px] border-black w-[10rem] text-center text-red-400 font-bold">
                    Canceled
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
