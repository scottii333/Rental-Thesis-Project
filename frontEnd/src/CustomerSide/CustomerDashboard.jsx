import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { CustomerHeader } from "./CustomerHeader";
import axios from "axios";

export const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("rentStatus"); // Default to Rent Status
  const navigate = useNavigate(); // Initialize navigate
  const [history, setHistory] = useState([]);
  const [ongoingRequests, setOngoingRequests] = useState([]);
  const [requests, setRequests] = useState([]);

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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5098/api/Admin/GetAllRequests"
        );
        console.log("Fetched pre-approved Data:", response.data); // Log data here
        setRequests(response.data);

        // Fetch all ongoing requests
        const ongoingResponse = await axios.get(
          "http://localhost:5098/api/Admin/GetOngoingRequests"
        );

        console.log("Fetched Ongoing Data:", ongoingResponse.data);

        setOngoingRequests(ongoingResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <CustomerHeader />
      <div className="flex gap-1">
        {/* Sidebar */}
        <div className="flex flex-col h-[55rem] w-[30%] min-w-[10rem] bg-mainBackgroundColor text-white text-center pt-[5rem] gap-[1rem] items-center">
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
            <div className="flex gap-[0.5rem] w-[100%] overflow-x-scroll">
              <div>
                <h2 className="text-center font-bold text-[2rem]">
                  Ongoing Process
                </h2>
                <div className="flex flex-nowrap p-[1rem] h-[50rem] w-[30rem] overflow-x-scroll gap-[1rem] shrink-0 shadow-2xl rounded-md border border-black">
                  {requests.map((request) => (
                    <div
                      key={request.referenceId}
                      className="border border-black p-[1rem] w-[20rem] flex-shrink-0 flex flex-col text-center items-center gap-[0.5rem] rounded-md "
                    >
                      <h2>Reference no: {request.referenceId}</h2>

                      <div className="flex gap-[0.5rem] justify-center p-[0.5rem]">
                        <img
                          className=" border border-black w-[8em] h-[9rem]"
                          src={`data:image/png;base64,${request.driverLicenseFront}`}
                          alt="License Front"
                        />
                        <img
                          className=" border border-black w-[8em] h-[9rem]"
                          src={`data:image/png;base64,${request.driverLicenseBack}`}
                          alt="License Back"
                        />
                      </div>
                      <p className="text-center">Front and Back License</p>
                      <img
                        src={`data:image/png;base64,${request.paymentProof}`}
                        className="border border-black w-[10rem] h-[10rem] mt-[0.5rem]"
                        alt="Gcash Proof Payment"
                      />
                      <p className="text-center">Gcash Proof Payment</p>
                      <p>Location: {request.userLocation || "N/A"}</p>
                      <p>
                        Pickup Date:{" "}
                        {new Date(request.pickupDate).toLocaleDateString()}
                      </p>
                      <p>
                        Dropoff Date:{" "}
                        {new Date(request.returnDate).toLocaleDateString()}
                      </p>
                      <p>
                        Van Name:{" "}
                        {request.selectedVan
                          ? JSON.parse(request.selectedVan).name
                          : "N/A"}
                      </p>
                      <p>Rental Option: {request.rentalOption}</p>
                      <p>Payment Type: {request.paymentType}</p>
                      <p>
                        Price:{" "}
                        {request.selectedVan
                          ? `₱${JSON.parse(request.selectedVan).price}`
                          : "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-center font-bold text-[2rem]">
                  Ongoing Rent
                </h2>
                <div className="flex flex-nowrap p-[1rem] h-[50rem] w-[30rem] overflow-x-scroll gap-[1rem] shrink-0 shadow-2xl rounded-md border border-black">
                  {ongoingRequests.map((request) => (
                    <div
                      key={request.referenceId}
                      className="border border-black p-[1rem] w-[20rem] flex-shrink-0 flex flex-col text-center items-center gap-[0.5rem] rounded-md "
                    >
                      <h2>Reference no: {request.referenceId}</h2>

                      <div className="flex gap-[0.5rem] justify-center p-[0.5rem]">
                        <img
                          className=" border border-black w-[8em] h-[9rem]"
                          src={`data:image/png;base64,${request.driverLicenseFront}`}
                          alt="License Front"
                        />
                        <img
                          className=" border border-black w-[8em] h-[9rem]"
                          src={`data:image/png;base64,${request.driverLicenseBack}`}
                          alt="License Back"
                        />
                      </div>
                      <p className="text-center">Front and Back License</p>
                      <img
                        src={`data:image/png;base64,${request.paymentProof}`}
                        className="border border-black w-[10rem] h-[10rem] mt-[0.5rem]"
                        alt="Gcash Proof Payment"
                      />
                      <p className="text-center">Gcash Proof Payment</p>
                      <p>Location: {request.userLocation || "N/A"}</p>
                      <p>
                        Pickup Date:{" "}
                        {new Date(request.pickupDate).toLocaleDateString()}
                      </p>
                      <p>
                        Dropoff Date:{" "}
                        {new Date(request.returnDate).toLocaleDateString()}
                      </p>
                      <p>
                        Van Name:{" "}
                        {request.selectedVan
                          ? JSON.parse(request.selectedVan).name
                          : "N/A"}
                      </p>
                      <p>Rental Option: {request.rentalOption}</p>
                      <p>Payment Type: {request.paymentType}</p>
                      <p>
                        Price:{" "}
                        {request.selectedVan
                          ? `₱${JSON.parse(request.selectedVan).price}`
                          : "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
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
