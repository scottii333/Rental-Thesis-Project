import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EasyDriveIntroBg from "../Images/EasyDriveIntroBg.png";
import axios from "axios";
import EasyMiles from "../Images/EasyMiles.png";
import EasyFuel from "../Images/EasyFuel.png";
import EasyGear from "../Images/EasyGear.png";

export const Homepage = () => {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [location, setLocation] = useState("");
  const [vans, setVans] = useState([]);
  const navigate = useNavigate(); // For navigation

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

  const handleViewVehicles = () => {
    if (!location || !pickupDate || !returnDate) {
      alert("Please fill out all fields.");
      return;
    }

    if (pickupDate < new Date() || returnDate < new Date()) {
      alert("Dates must be current or future dates.");
      return;
    }

    if (pickupDate >= returnDate) {
      alert("Return date must be after the pickup date.");
      return;
    }

    // Redirect to /availableVan with the data
    navigate("/availableVan", {
      state: {
        location,
        pickupDate,
        returnDate,
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* section for intro */}
      <div
        className="h-[40rem] w-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center text-white px-4"
        style={{ backgroundImage: `url(${EasyDriveIntroBg})` }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-center uppercase mb-4 tracking-[0.5rem]">
          HIT THE ROAD <br />
          ESCAPE THE CITY
        </h1>

        <p className="text-sm md:text-lg text-center max-w-lg md:max-w-3xl mb-8">
          Whether you are planning a weekend getaway, a road trip with friends,
          or <br /> a family adventure, we’ve got the perfect vehicle to suit
          your needs.
        </p>

        {/* Action Section */}
        <div className="bg-white bg-opacity-20 rounded-md p-4 shadow-lg flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center w-full max-w-4xl">
          {/* Location Input */}
          <div className="flex flex-col w-full md:w-1/4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
              className=" bg-white bg-opacity-55 px-4 py-2 rounded-md text-black placeholder:text-white"
            />
          </div>

          {/* Pick-up Date Picker */}
          <div className="flex flex-col w-full md:w-1/4">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              placeholderText="Select Pick-up Date"
              className="bg-white bg-opacity-55 px-4 py-2 rounded-md text-black placeholder:text-white w-full"
            />
          </div>

          {/* Return Date Picker */}
          <div className="flex flex-col w-full md:w-1/4">
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              placeholderText="Select Return Date"
              className="bg-white bg-opacity-55 px-4 py-2 rounded-md text-black placeholder:text-white w-full"
            />
          </div>

          {/* View Vehicles Button */}
          <button
            onClick={handleViewVehicles}
            className="bg-[#201207] text-white px-6 py-3 rounded-md hover:bg-[#33150e] transition w-full md:w-auto"
          >
            View Vehicles
          </button>
        </div>
      </div>


      {/* section for Vehicles */}
      <div className="flex flex-col border-solid h-auto max-w-[80%] mx-auto mt-[3rem] mb-[3rem] gap-[1rem] p-[1rem]">
        <h2 className="text-white text-[2rem] text-center sm:text-left">
          Available Vehicles
        </h2>
        <div className="rounded-md h-[20rem] overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <div className="flex flex-nowrap gap-[2rem] ">
            {/* Content */}
            {vans.length > 0 ? (
              vans.map((van) => (
                <div
                  key={van.id}
                  className="flex-shrink-0 border-solid border-white border w-[20rem] h-[17rem] p-[0.5rem] rounded-md text-center"
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
                  <h2 className="mt-[1rem] mb-[5px] font-bold text-white">
                    {van.name}
                  </h2>

                  <div className="flex flex-wrap justify-around border-t-gray-400 border-t-[1px] pt-2 pb-2 gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyMiles}
                        className="w-[1.5rem] filter invert"
                        alt="mileage icon"
                      />
                      <p className="text-white">{van.mileage}kM/L</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyFuel}
                        className="w-[1.5rem] filter invert"
                        alt="fuel type icon"
                      />
                      <p className="text-white">{van.fuelType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={EasyGear}
                        className="w-[1.5rem] filter invert"
                        alt="transmission icon"
                      />
                      <p className="text-white">{van.transmission}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading vans...</p>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};
