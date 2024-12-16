import IDIcon from "../Images/ID-icon.png";
import LocIcon from "../Images/location-icon.png";
import MessIcon from "../Images/messages-icon.png";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useEffect } from "react";

export const PriceList = () => {
  useEffect(() => {
    // Initialize AOS with dynamic offset and repeat animations
    const offsetValue = window.innerHeight * 0.3; // 20% of the viewport height
    AOS.init({
      duration: 1200, // Animation duration in ms
      once: false, // Allow repeat on scroll
      offset: offsetValue, // Trigger when 80% of the element is in the viewport
    });

    // Recalculate offset on resize for responsiveness
    const handleResize = () => {
      AOS.refresh(); // Refresh AOS to apply the updated offset
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      data-aos="fade-right"
      className="mt-[5rem] mb-[5rem]  p-[1rem] flex flex-col items-center gap-[1rem] text-white"
    >
      <h2 className="text-[2.5rem]">Quick, Simple and Secure</h2>
      <p className="text-[1.5rem]">
        Reserve your van in minutes.Your rental is just a few clicks away.
      </p>
      <div className="flex gap-[10rem]">
        <div className="w-[6rem] flex flex-col items-center p-[0.4rem] gap-1">
          <img className="w-[5rem] invert" src={LocIcon} />
          <p>Choose your Destination</p>
        </div>
        <div className="w-[6rem] flex flex-col items-center p-[0.4rem] gap-1">
          <img className="w-[5rem] invert" src={MessIcon} />
          <p>Select Your Van </p>
        </div>
        <div className="w-[6rem] flex flex-col items-center p-[0.4rem] gap-1">
          <img className="w-[5rem] invert" src={IDIcon} />
          <p>Upload Your Documents</p>
        </div>
      </div>
    </div>
  );
};
