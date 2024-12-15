import EasyDriveWide from "../Images/EasyDriveWide.png";

export const Pricing = () => {
  return (
    <div className="w-full max-w-[100rem] mt-[5rem] relative">
      {/* Image */}
      <img className="w-full" src={EasyDriveWide} alt="Easy Drive Van" />

      {/* Text on top of the image */}
      <h2 className="absolute top-[70%] right-[5%] text-right text-white text-sm sm:text-base md:text-2xl lg:text-4xl  px-4 sm:px-2 md:px-8 max-w-[90%] sm:max-w-[85%] sm:text-right leading-tight">
        Adventure awaits, <br />
        and your journey begins with the right van.
      </h2>
    </div>
  );
};
