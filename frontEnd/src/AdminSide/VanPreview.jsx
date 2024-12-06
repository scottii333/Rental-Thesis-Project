import { useState, useEffect } from "react";
import axios from "axios";
import EasyMiles from "../Images/EasyMiles.png";
import EasyFuel from "../Images/EasyFuel.png";
import EasyGear from "../Images/EasyGear.png";

export const VanPreview = () => {
  const [vans, setVans] = useState([]);

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

  return (
    <div className="flex flex-wrap justify-center m-[0.5rem] h-[90dvh] p-[1rem] gap-[1rem] overflow-auto">
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
              <button className="text-[#0292B7] text-[0.7rem]">
                View details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading vans...</p>
      )}
    </div>
  );
};
