import { useEffect, useState } from "react";
import axios from "axios";
import sampleId from "../Images/ID-icon.png";

export const AdminApproved = () => {
  const [requests, setRequests] = useState([]);
  const [ongoingRequests, setOngoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5098/api/Admin/GetAllRequests"
        );
        console.log("Fetched Data:", response.data); // Log data here
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = (referenceId) => {
    const approvedRequest = requests.find(
      (request) => request.referenceId === referenceId
    );

    if (approvedRequest) {
      // Add to On-going list
      setOngoingRequests((prev) => [...prev, approvedRequest]);

      // Remove from Pre-Approval list
      setRequests((prev) =>
        prev.filter((request) => request.referenceId !== referenceId)
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50%]">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-[5rem] p-[1rem] overflow-x-scroll">
      {/* component for pre-approved requests */}
      <div>
        <h2 className="text-center text-2xl font-bold">Pre-Approval</h2>
        <div className="flex flex-nowrap p-[1rem] h-[50rem] w-[30rem] overflow-x-scroll gap-[1rem] shrink-0 shadow-2xl rounded-md">
          {requests.map((request) => (
            <div
              key={request.referenceId}
              className="border border-black p-[1rem] w-[20rem] flex-shrink-0 flex flex-col text-center items-center gap-[0.5rem] rounded-md "
            >
              <h2>Reference no: {request.referenceId}</h2>

              <div className="flex justify-center p-[0.5rem]">
                <img className="w-[8em]" src={sampleId} alt="License Front" />
                <img className="w-[8em]" src={sampleId} alt="License Back" />
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
                Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
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
              <button
                className="bg-green-400 w-[8rem] p-[0.5rem] rounded-md transition duration-300 hover:bg-green-500 hover:scale-105 hover:text-white"
                onClick={() => handleApprove(request.referenceId)}
              >
                Approved
              </button>
              <button className="bg-red-400 w-[8rem] p-[0.5rem] rounded-md transition duration-300 hover:bg-red-500 hover:scale-105 hover:text-white">
                Reject
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* component for ongoing requests */}
      <div>
        <h2 className="text-center text-2xl font-bold">On-going</h2>
        <div className="flex flex-nowrap p-[1rem] h-[50rem] w-[30rem] overflow-x-scroll gap-[1rem] shrink-0 shadow-2xl rounded-md">
          {ongoingRequests.map((request) => (
            <div
              key={request.referenceId}
              className="border border-black p-[1rem] w-[20rem] flex-shrink-0 flex flex-col text-center items-center gap-[0.5rem] rounded-md "
            >
              <h2>Reference no: {request.referenceId}</h2>

              <div className="flex justify-center p-[0.5rem]">
                <img className="w-[8em]" src={sampleId} alt="License Front" />
                <img className="w-[8em]" src={sampleId} alt="License Back" />
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
                Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
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
              <button className="bg-green-400 w-[8rem] p-[0.5rem] rounded-md transition duration-300 hover:bg-green-500 hover:scale-105 hover:text-white">
                Completed
              </button>
              <button className="bg-red-400 w-[8rem] p-[0.5rem] rounded-md transition duration-300 hover:bg-red-500 hover:scale-105 hover:text-white">
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
