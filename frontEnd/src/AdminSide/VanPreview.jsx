import EasyDriveCar1 from "../Images/EasyDriveCar1.png";
import EasyMiles from "../Images/EasyMiles.png";
import EasyFuel from "../Images/EasyFuel.png";
import EasyGear from "../Images/EasyGear.png";

export const VanPreview = () => {
  return (
    <div className="flex flex-wrap justify-center  m-[0.5rem] h-[90dvh] p-[1rem] gap-[1rem] overflow-auto">
      {/* card van design */}
      <div className="border-solid border-black border w-[20rem] h-[23rem] p-[0.5rem] rounded-md text-center ">
        <img src={EasyDriveCar1} className="w-[100%] rounded-md" />
        <h2 className="mt-[1rem] mb-[5px]">Foton Transvan</h2>
        <h3 className="mb-[1rem]">Camper Van Conversion</h3>
        <div className="flex flex-wrap justify-around border-t-gray-400 border-t-[1px] pt-2 pb-2 gap-3">
          <div className="flex items-center gap-2 ">
            <img src={EasyMiles} className="w-[1.5rem]" />
            <p>12kM/L</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={EasyFuel} className="w-[1.5rem]" />
            <p>Diesel</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={EasyGear} className="w-[1.5rem]" />
            <p>Automatic</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-around items-center">
          <div className="flex justify-around items-center w-[10rem] mt-2 mb-2 ">
            <h2>P2,500 </h2>
            <p className="text-[10px] text-gray-400">4-6 Passengers</p>
          </div>
          <button className="text-[#0292B7] text-[0.7rem] ">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};
