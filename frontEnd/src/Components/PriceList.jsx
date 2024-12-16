import IDIcon from "../Images/ID-icon.png";
import LocIcon from "../Images/location-icon.png";
import MessIcon from "../Images/messages-icon.png";
export const PriceList = () => {
  return (
    <div className="mt-[5rem]">
      <h2>Quick, Simple and Secure</h2>
      <p>Reserve your van in minutes.Your rental is just a few clicks away.</p>
      <div>
        <img className="w-[2rem]" src={LocIcon} />
        <p>Choose your Destination</p>
      </div>
      <div>
        <img className="w-[2rem]" src={MessIcon} />
        <p>Select Your Van </p>
      </div>
      <div>
        <img className="w-[2rem]" src={IDIcon} />
        <p>Upload Your Documents</p>
      </div>
    </div>
  );
};
