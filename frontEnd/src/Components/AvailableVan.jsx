import { MainHeader } from "./MainHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import EasyMiles from "../Images/EasyMiles.png";
import EasyFuel from "../Images/EasyFuel.png";
import EasyGear from "../Images/EasyGear.png";
import { AccountAuthModal } from "./AccountAuthModal";
import { useLocation, useNavigate } from "react-router-dom";

export const AvailableVan = () => {
  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control login modal
  const [isSignUp, setIsSignUp] = useState(false); // Default to login mode
  const location = useLocation();
  const navigate = useNavigate();

  const {
    location: userLocation,
    pickupDate,
    returnDate,
  } = location.state || {};

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5098/api/Admin/GetAllVans"
        );
        console.log("Fetched Vans:", response.data); // Log API response
        setVans(response.data);
      } catch (error) {
        console.error("Error fetching vans:", error);
      }
    };

    fetchVans();
  }, []);

  const handleViewDetails = (van) => {
    setSelectedVan(van);
  };

  const handleCloseModal = () => {
    setSelectedVan(null);
  };

  const handleChooseVan = () => {
    // Redirect to the order details page with the selected van and user data
    navigate("/orderDetails", {
      state: {
        selectedVan,
        userLocation,
        pickupDate,
        returnDate,
      },
    });
  };
  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl w-[95%] m-[1rem]">SELECT YOUR VAN</h1>
        <div className=" w-[95%] h-[auto] m-[1rem]">
          <div className="border-red-600 border flex flex-wrap justify-center m-[0.5rem] h-[auto] p-[1rem] gap-[1rem] ">
            {vans.length > 0 ? (
              vans.map((van) => (
                <div
                  key={van.id}
                  className="border-solid border-black border w-[20rem] h-[23rem] p-[0.5rem] rounded-md text-center"
                >
                  {van.image ? ( // Ensure the correct 'image' property is used here
                    <img
                      src={van.image} // Use 'van.image' for the Base64 string
                      className="w-[100%] h-[10rem]  object-center rounded-md"
                      alt={van.name}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h2 className="mt-[1rem] mb-[5px] font-bold">{van.name}</h2>
                  <h3 className="mb-[1rem]">
                    {van.description.length > 15
                      ? `${van.description.substring(0, 70)}...`
                      : van.description}
                  </h3>
                  <div className="flex flex-wrap justify-around border-t-gray-400 border-t-[1px] pt-2 pb-2 gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyMiles}
                        className="w-[1.5rem]"
                        alt="mileage icon"
                      />
                      <p>{van.mileage}kM/L</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyFuel}
                        className="w-[1.5rem]"
                        alt="fuel type icon"
                      />
                      <p>{van.fuelType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyGear}
                        className="w-[1.5rem]"
                        alt="transmission icon"
                      />
                      <p>{van.transmission}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-around items-center">
                    <div className="flex justify-around items-center w-[8.2rem] mt-2 mb-2 ">
                      <h2>₱{van.price}</h2>
                      <p className="text-[10px] text-gray-400">
                        4-{van.capacity} Passengers
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewDetails(van)}
                      className="text-[#0292B7] text-[0.7rem]"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading vans...</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedVan && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[60rem] max-w-[98rem] h-[40rem]  relative flex  flex-col items-center gap-[1rem] m-[1rem] overflow-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 rounded-full p-2"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold">{selectedVan.name}</h2>
            <h2>Camper Van Conversion</h2>
            <img
              src={selectedVan.image}
              alt={selectedVan.name}
              className="w-full max-w-[50rem] h-[20rem] object-cover rounded-md mt-3"
            />
            <p className="mt-3">- {selectedVan.description}</p>
            <p>
              - Fully Functional Kithcen, Compact stove, sink and fridge for
              cooking and convenience
            </p>
            <p>
              - Built-in Storage for all your travel essentials to keep your
              space clean and organized
            </p>
            <div className="flex flex-wrap justify-around w-[20rem] mt-5 gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={EasyMiles}
                  className="w-[1.5rem]"
                  alt="mileage icon"
                />
                <p>{selectedVan.mileage}kM/L</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={EasyFuel} className="w-[1.5rem]" alt="fuel icon" />
                <p>{selectedVan.fuelType}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={EasyGear} className="w-[1.5rem]" alt="gear icon" />
                <p>{selectedVan.transmission}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 w-[15rem]">
              <h2 className="text-lg font-bold">₱{selectedVan.price}</h2>
              <p className="text-sm text-gray-400">
                Capacity: 4-{selectedVan.capacity} Passengers
              </p>
            </div>
            <button
              onClick={handleChooseVan}
              className="w-[20rem] bg-[#6C2A4D] rounded-md text-white p-[1rem] flex justify-center items-center text-center hover:bg-[#8E3A5E] hover:scale-105 transition-transform duration-300"
            >
              Choose this Van
            </button>
          </div>
        </div>
      )}

      {/* Login/Sign Up Modal */}
      <AccountAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        isSignUp={isSignUp}
        toggleMode={(mode) => setIsSignUp(mode)} // Toggle between Sign Up and Log In
      />
    </div>
  );
};
