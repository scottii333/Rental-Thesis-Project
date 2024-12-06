import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MainHeader } from "./MainHeader";

export const OrderSummary = () => {
  const { state } = useLocation();

  // Destructure the passed data
  const {
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
  } = state || {};

  // State for payment method, type, and proof of payment
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default: cash
  const [paymentType, setPaymentType] = useState("full"); // Default: full payment
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState(null);

  // Handle payment proof file upload
  const handlePaymentProofUpload = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
    if (file) {
      setPaymentProofPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Generate preview URLs for driver's license files
  const frontPreview =
    driverLicenseFront && driverLicenseFront instanceof File
      ? URL.createObjectURL(driverLicenseFront)
      : driverLicenseFront;
  const backPreview =
    driverLicenseBack && driverLicenseBack instanceof File
      ? URL.createObjectURL(driverLicenseBack)
      : driverLicenseBack;

  // Confirm details handler
  const handleConfirmDetails = () => {
    if (!paymentProof) {
      alert("Please upload proof of payment before confirming.");
      return;
    }
    alert("Details confirmed successfully! Thank you for your payment.");
    console.log({
      paymentMethod,
      paymentType,
      proof: paymentProof,
    });
  };

  return (
    <div>
      <MainHeader />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Booking Summary</h1>

        {/* Booking Details */}
        <div className="h-[auto] p-[1rem] rounded-md shadow-md">
          <div className="flex flex-wrap justify-around m-[1rem] gap-[1rem] items-center">
            <p className="p-2">
              <strong>Van:</strong> {selectedVan.name}
            </p>
            <p className="p-2">
              <strong>Price:</strong> {selectedVan.price}
            </p>
            <p className="p-2">
              <strong>Capacity:</strong> 4-{selectedVan.capacity}
            </p>
          </div>
          <div className="flex flex-wrap justify-around m-[1rem] gap-[1rem] items-center">
            <p className="p-2">
              <strong>Location:</strong> {userLocation}
            </p>
            <p className="p-2">
              <strong>Pick-up:</strong>{" "}
              {pickupDate ? new Date(pickupDate).toLocaleDateString() : "N/A"}
            </p>
            <p className="p-2">
              <strong>Return:</strong>{" "}
              {returnDate ? new Date(returnDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex flex-wrap justify-around m-[1rem] gap-[1rem] items-center">
            <p className="p-2">
              <strong>Street:</strong> {streetAddress}
            </p>
            <p className="p-2">
              <strong>City:</strong> {city}
            </p>
          </div>
          <div className="flex flex-wrap justify-around m-[1rem] gap-[1rem] items-center">
            <p className="p-2">
              <strong>Province:</strong> {province}
            </p>
            <p className="p-2">
              <strong>Zip Code:</strong> {zip}
            </p>
            <p className="p-2">
              <strong>Mobile Number:</strong> {mobileNumber}
            </p>
          </div>
        </div>

        {/* Rental Option */}
        <div className="flex flex-col items-center gap-[1rem] mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Rental Option</h2>
          <p>{rentalOption === "self-drive" ? "Self-Drive" : "With Driver"}</p>
          <h2 className="text-lg font-semibold">Driver&apos;s License</h2>
          <div className="flex space-x-4">
            {frontPreview ? (
              <div>
                <h3>Front</h3>
                <img
                  src={frontPreview}
                  alt="Driver License Front"
                  className="w-40 h-40 rounded-md"
                />
              </div>
            ) : (
              <p>No front license image provided.</p>
            )}
            {backPreview ? (
              <div>
                <h3>Back</h3>
                <img
                  src={backPreview}
                  alt="Driver License Back"
                  className="w-40 h-40 rounded-md"
                />
              </div>
            ) : (
              <p>No back license image provided.</p>
            )}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <div className="flex gap-[1rem]">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="gcash"
                checked={paymentMethod === "gcash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              GCash
            </label>
          </div>
        </div>

        {/* Payment Type */}
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Payment Type</h2>
          <div className="flex gap-[1rem]">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="full"
                checked={paymentType === "full"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              Full Payment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="dp"
                checked={paymentType === "dp"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              Down Payment
            </label>
          </div>
        </div>

        {/* Proof of Payment */}
        <div className="mt-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold">Proof of Payment</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handlePaymentProofUpload}
            className="border rounded p-2 w-full"
          />
          {paymentProofPreview && (
            <img
              src={paymentProofPreview}
              alt="Proof of Payment"
              className="w-40 h-40 mt-4 rounded-md"
            />
          )}
        </div>

        {/* Confirm Details Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleConfirmDetails}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
};
