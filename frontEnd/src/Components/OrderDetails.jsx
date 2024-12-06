import { useState } from "react";
import { MainHeader } from "./MainHeader";
import { useLocation, useNavigate } from "react-router-dom";

export const OrderDetails = () => {
  const location = useLocation();
  // Inside the component:
  const navigate = useNavigate();

  // Retrieve the data passed from AvailableVan
  const { selectedVan, userLocation, pickupDate, returnDate } =
    location.state || {};

  // Log the data to the console for debugging
  console.log("Selected Van:", selectedVan);
  console.log("User Location:", userLocation);
  console.log("Pickup Date:", pickupDate);
  console.log("Return Date:", returnDate);

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [rentalOption, setRentalOption] = useState("self-drive");
  const [driverLicenseFront, setDriverLicenseFront] = useState(null);
  const [driverLicenseBack, setDriverLicenseBack] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const handleFileChangeFront = (event) => {
    const file = event.target.files[0];
    setDriverLicenseFront(file);
    if (file) {
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChangeBack = (event) => {
    const file = event.target.files[0];
    setDriverLicenseBack(file);
    if (file) {
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const handleProceedToPayment = async () => {
    if (
      !streetAddress ||
      !city ||
      !province ||
      !zip ||
      !mobileNumber ||
      !driverLicenseFront ||
      !driverLicenseBack
    ) {
      alert(
        "All fields are required, including uploading the front and back of your driver's license."
      );
      return;
    }
    // Collect all the data into an object
    const orderDetails = {
      selectedVan,
      userLocation,
      pickupDate,
      returnDate,
      streetAddress,
      city,
      province,
      zip,
      mobileNumber,
      rentalOption,
      driverLicenseFront,
      driverLicenseBack,
    };

    console.log("Order Details Submitted:", orderDetails);

    // Navigate to the next component and pass the data
    navigate("/orderSummary", { state: orderDetails });
  };

  return (
    <div>
      <MainHeader />
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>

        {/* Contact Information */}
        <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Rental Options */}
        <div className="w-full max-w-md bg-white p-4 mt-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Rental Options</h2>
          <select
            value={rentalOption}
            onChange={(e) => setRentalOption(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="self-drive">Self Drive</option>
            <option value="with-driver">With Driver</option>
          </select>
        </div>

        {/* Driver's License Upload */}
        <div className="w-full max-w-md bg-white p-4 mt-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Driver&apos;s License</h2>
          <div className="flex flex-col space-y-4">
            <h3>Front</h3>
            <div className="items-center flex flex-col ">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChangeFront}
                className="border rounded px-3 py-2 w-full"
                required
              />
              {frontPreview && (
                <img
                  src={frontPreview}
                  alt="Driver License Front"
                  className="w-[10rem] h-[10rem] mt-3 rounded-md"
                />
              )}
            </div>
            <h3>Back</h3>
            <div className="items-center flex flex-col ">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChangeBack}
                className="border rounded px-3 py-2 w-full"
                required
              />
              {backPreview && (
                <img
                  src={backPreview}
                  alt="Driver License Back"
                  className="w-[10rem] h-[10rem] mt-3 rounded-md"
                />
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Ensure your license is:
            <ul className="list-disc pl-5">
              <li>Up-to-date and not expired</li>
              <li>Clear and not blurry</li>
              <li>Shows all four corners of the card</li>
              <li>Matches the name on your account</li>
              <li>No glare or reflections in the photo</li>
            </ul>
          </p>
        </div>

        <button
          onClick={handleProceedToPayment}
          className="bg-blue-600 text-white px-6 py-3 mt-6 rounded hover:bg-blue-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};
