import EasyDrivePng1 from "../Images/EasyDrivePng1.jpeg";
import EasyDrivePng2 from "../Images/EasyDrivePng2.jpeg";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { useEffect } from "react";

export const Services = () => {
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
    <div id="Services" className="mt-[5rem]">
      <div className="flex flex-col max-w-[60rem] h-[auto] p-[1rem] m-[1rem] gap-[1rem]">
        <div className="flex justify-around flex-wrap gap-[1rem] ">
          <div
            data-aos="fade-right"
            className="w-[20rem] flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-white font-bold mb-2 text-2xl">
              Flexible Rental Options
            </h2>
            <p className="text-white text-lg">
              Hourly, daily, weekly, or monthly rental options available. Choose
              the best option for you.
            </p>
          </div>
          <div data-aos="fade-left" className="max-w-[30rem] min-w-[2rem]">
            <img className="w-[100%] rounded-xl" src={EasyDrivePng1} />
          </div>
        </div>

        <div className="flex justify-around flex-wrap gap-[1rem] ">
          <div data-aos="fade-right" className="max-w-[30rem] min-w-[2rem]">
            <img className="w-[100%] rounded-xl" src={EasyDrivePng2} />
          </div>
          <div
            data-aos="fade-left"
            className="w-[20rem] text-center items-center flex flex-col justify-center"
          >
            <h2 className="text-white font-bold mb-2 text-2xl">
              Wide Selection of Vans
            </h2>
            <p className="text-white text-lg">
              Choose from a wide selection of vans to suit your needs. From
              small vans to large vans, we have it all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
