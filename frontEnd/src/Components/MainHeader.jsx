import { useState } from "react";
import { AccountAuthModal } from "./AccountAuthModal"; // Import the modal
import EasyDriveLogo from "../Images/EasyDriveLogo.png";

export const MainHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign Up and Log In

  // Function to toggle between Sign Up and Log In
  const toggleMode = (mode) => setIsSignUp(mode);

  return (
    <>
      <div className="bg-[#201207] w-full h-[6rem] flex justify-around items-center">
        {/* Navigation Links */}
        <div className="flex space-x-4 p-2">
          <a
            href="/"
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Services
          </a>
          <a
            href="/"
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Pricing
          </a>
          <a
            href="/"
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Contact Us
          </a>
        </div>

        {/* Logo */}
        <a href="/">
          <img src={EasyDriveLogo} alt="Easy Drive Logo" className="h-[4rem]" />
        </a>

        {/* Sign Up and Log In Buttons */}
        <div className="flex space-x-4 p-2">
          {/* Open Sign Up Modal */}
          <button
            onClick={() => {
              setIsModalOpen(true); // Open modal
              setIsSignUp(true); // Set to Sign Up mode
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Sign Up
          </button>

          {/* Open Log In Modal */}
          <button
            onClick={() => {
              setIsModalOpen(true); // Open modal
              setIsSignUp(false); // Set to Log In mode
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Log In
          </button>
        </div>
      </div>

      {/* Account Authentication Modal */}
      <AccountAuthModal
        isOpen={isModalOpen} // Pass whether the modal is open
        onClose={() => setIsModalOpen(false)} // Function to close the modal
        isSignUp={isSignUp} // Pass current mode (Sign Up or Log In)
        toggleMode={toggleMode} // Pass function to toggle between modes
      />
    </>
  );
};
