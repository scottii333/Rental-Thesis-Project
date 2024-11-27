import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EasyDriveIntroBg from "../Images/EasyDriveIntroBg.png";

export const Homepage = () => {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
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
          <button className="bg-[#201207] text-white px-6 py-3 rounded-md hover:bg-[#33150e] transition w-full md:w-auto">
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
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
            {/* Content */}
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
            <div className="border-[1px] border-white rounded-md flex-shrink-0 w-[15rem] sm:w-[18rem] md:w-[20rem] h-[15rem] sm:h-[18rem] m-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
