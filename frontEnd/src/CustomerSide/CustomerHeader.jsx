import EasyDriveLogo from "../Images/EasyDriveLogo.png";

export const CustomerHeader = () => {
  return (
    <div className="flex border-b justify-center w-full bg-[#201207]">
      <img src={EasyDriveLogo} alt="Easy Drive Logo" className="h-[5rem]" />
    </div>
  );
};
