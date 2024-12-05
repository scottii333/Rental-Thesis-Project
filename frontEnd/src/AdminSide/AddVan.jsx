import { useState } from "react";
import axios from "axios";

export const AddVan = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    price: "",
    capacity: "",
    seats: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Validate inputs
  const validateInputs = () => {
    const requiredFields = [
      { field: "name", message: "Van Model is required" },
      { field: "description", message: "Description is required" },
      { field: "mileage", message: "Mileage is required" },
      { field: "fuelType", message: "Fuel Type is required" },
      { field: "transmission", message: "Transmission is required" },
      { field: "price", message: "Price is required" },
      { field: "capacity", message: "Capacity is required" },
      { field: "seats", message: "Number of Seats is required" },
    ];

    for (const { field, message } of requiredFields) {
      if (!formData[field].trim()) {
        alert(message);
        return false;
      }
    }

    if (!image) {
      alert("Please upload an image");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    // Create FormData to send to the backend
    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("Mileage", formData.mileage);
    data.append("FuelType", formData.fuelType);
    data.append("Transmission", formData.transmission);
    data.append("Price", formData.price);
    data.append("Capacity", formData.capacity);
    data.append("Seats", formData.seats);

    if (image) {
      data.append("Image", image); // Attach the image file
    }

    try {
      const response = await axios.post(
        "http://localhost:5098/api/Admin/AdminAddVan",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Van added successfully!");
        setFormData({
          name: "",
          description: "",
          mileage: "",
          fuelType: "",
          transmission: "",
          price: "",
          capacity: "",
          seats: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        alert("Failed to add van.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the van.");
    }
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Add New Van
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Fields */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Van Model
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter van model"
            />
          </div>
          <div>
            <label
              htmlFor="fuelType"
              className="block text-sm font-medium text-gray-700"
            >
              Fuel Type
            </label>
            <input
              type="text"
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter fuel type"
            />
          </div>
          <div>
            <label
              htmlFor="transmission"
              className="block text-sm font-medium text-gray-700"
            >
              Transmission
            </label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter transmission type"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label
              htmlFor="mileage"
              className="block text-sm font-medium text-gray-700"
            >
              Mileage
            </label>
            <input
              type="text"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter mileage"
            />
          </div>
          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-700"
            >
              Capacity
            </label>
            <input
              type="text"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter capacity"
            />
          </div>
          <div>
            <label
              htmlFor="seats"
              className="block text-sm font-medium text-gray-700"
            >
              Seats
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
              placeholder="Enter number of seats"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#623037] sm:text-sm"
            rows="4"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Van Photos
          </label>
          <div className="mt-2 flex items-center space-x-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md shadow"
              />
            ) : (
              <div className="h-24 w-24 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md shadow">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="vanImage"
            />
            <label
              htmlFor="vanImage"
              className="px-4 py-2 bg-[#623037] text-white rounded-md cursor-pointer hover:bg-opacity-90"
            >
              Choose File
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-[#623037] text-white rounded-md shadow hover:bg-opacity-90"
        >
          Add Van
        </button>
      </form>
    </div>
  );
};
