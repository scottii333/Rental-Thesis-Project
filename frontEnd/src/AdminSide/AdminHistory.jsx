export const AdminHistory = () => {
  return (
    <div>
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
  );
};
