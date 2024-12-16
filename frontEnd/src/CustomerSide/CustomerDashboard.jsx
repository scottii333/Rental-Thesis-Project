import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { CustomerHeader } from "./CustomerHeader";
import axios from "axios";

export const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("rentStatus"); // Default to Rent Status
  const navigate = useNavigate(); // Initialize navigate
  const [history, setHistory] = useState([]);

  // Function to handle Logout
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      navigate("/"); // Redirect to base URL
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5098/api/Admin/GetCustomerHistory"
        );
        console.log("Fetched History Data:", response.data);
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching history data:", err);
      }
    };

    fetchHistory();
  }, []);

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
            <div className="overflow-x-auto p-4">
              <div className="w-[60rem] shadow-lg rounded-lg overflow-hidden border border-gray-200">
                {/* Data Header */}
                <div className="w-full bg-gray-100 text-gray-700">
                  <div className="grid grid-cols-7 gap-4 p-4 text-center text-sm font-semibold">
                    <div className="text-center">Reference No</div>
                    <div className="text-center">Van</div>
                    <div className="text-center">Location</div>
                    <div className="text-center">Pick-Up</div>
                    <div className="text-center">Return</div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Status</div>
                  </div>
                </div>

                {/* Data Rows */}
                {history.map((record) => (
                  <div
                    key={record.referenceId}
                    className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50"
                  >
                    <div className="text-center text-gray-800">
                      {record.referenceId}
                    </div>
                    <div className="text-center text-gray-800">
                      {record.selectedVan
                        ? JSON.parse(record.selectedVan).name
                        : "N/A"}
                    </div>
                    <div className="text-center text-gray-800">
                      {record.userLocation}
                    </div>
                    <div className="text-center text-gray-800">
                      {new Date(record.pickupDate).toLocaleDateString()}
                    </div>
                    <div className="text-center text-gray-800">
                      {new Date(record.returnDate).toLocaleDateString()}
                    </div>
                    <div className="text-center text-gray-800">
                      ₱{record.price}
                    </div>
                    <div
                      className={`text-center font-bold ${
                        record.status === "Completed"
                          ? "text-green-400"
                          : record.status === "Canceled"
                          ? "text-red-400"
                          : "text-orange-400"
                      }`}
                    >
                      {record.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
