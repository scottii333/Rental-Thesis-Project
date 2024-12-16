import { useEffect } from "react";
import EasyDriveWide from "../Images/EasyDriveWide.png";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";

export const Pricing = () => {
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
    <div className="w-full max-w-[100rem] mt-[5rem] relative">
      {/* Image */}
      <img
        data-aos="fade-right"
        className="w-full"
        src={EasyDriveWide}
        alt="Easy Drive Van"
      />

      {/* Text on top of the image */}
      <h2
        data-aos="fade-left"
        className="absolute top-[70%] right-[5%] text-right text-white text-sm sm:text-base md:text-2xl lg:text-4xl  px-4 sm:px-2 md:px-8 max-w-[90%] sm:max-w-[85%] sm:text-right leading-tight"
      >
        Adventure awaits, <br />
        and your journey begins with the right van.
      </h2>
    </div>
  );
};
