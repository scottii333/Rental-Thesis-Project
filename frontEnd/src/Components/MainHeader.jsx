import { useState } from "react";
import { AccountAuthModal } from "./AccountAuthModal"; // Import the modal
import EasyDriveLogo from "../Images/EasyDriveLogo.png";

export const MainHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign Up and Log In
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State to toggle mobile navigation

  // Function to toggle between Sign Up and Log In
  const toggleMode = (mode) => setIsSignUp(mode);

  return (
    <>
      <div className="bg-[#201207] w-full h-[6rem] flex items-center justify-around px-4">
        {/* Navigation Links (Desktop Only) */}
        <div className="hidden md:flex space-x-4">
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

        {/* Logo in the Center */}
        <a href="/" className="flex justify-center">
          <img src={EasyDriveLogo} alt="Easy Drive Logo" className="h-[4rem]" />
        </a>

        {/* Authentication Buttons (Desktop Only) */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsSignUp(true);
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsSignUp(false);
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Log In
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <div className="w-full flex flex-col items-center bg-[#201207] text-white space-y-4 py-4 md:hidden">
          {/* Navigation Links */}
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

          {/* Authentication Buttons */}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsSignUp(true);
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsSignUp(false);
            }}
            className="text-white p-2 rounded-[0.5rem] hover:bg-white hover:text-black hover:rounded-[0.5rem] transition ease-in-out duration-500"
          >
            Log In
          </button>
        </div>
      )}

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
