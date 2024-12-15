import EasyDriveLogo from "../Images/EasyDriveLogo.png";
export const MainFooter = () => {
  return (
    <div className="flex flex-wrap justify-center p-[2rem] md:p-[5rem] mt-[3rem] mb-[3rem] gap-[10rem] items-center">
      {/* Quick Links */}
      <div className="flex flex-col p-[1rem] gap-[0.5rem] text-white text-center">
        <h3 className="text-lg font-semibold">Quick Links</h3>
        <a href="" className="hover:underline">
          Term of Use
        </a>
        <a href="" className="hover:underline">
          Privacy Notice Policy
        </a>
        <a href="" className="hover:underline">
          Cookie Policy
        </a>
      </div>

      {/* Logo */}
      <img
        src={EasyDriveLogo}
        alt="Easy Drive Logo"
        className="h-[3rem] md:h-[4rem]"
      />

      {/* Contact Us */}
      <div
        id="Contact"
        className="flex flex-col p-[1rem] gap-[0.5rem] text-white text-center"
      >
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <p>easydrive-csr@gmail.com</p>
        <p>123-456-7890</p>
      </div>
    </div>
  );
};
