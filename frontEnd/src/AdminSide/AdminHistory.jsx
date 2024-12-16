import { useEffect, useState } from "react";
import axios from "axios";

export const AdminHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50%]">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
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
              {record.selectedVan ? JSON.parse(record.selectedVan).name : "N/A"}
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
            <div className="text-center text-gray-800">₱{record.price}</div>
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
  );
};
