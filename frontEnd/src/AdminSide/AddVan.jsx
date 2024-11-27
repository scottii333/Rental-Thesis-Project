import { useState } from "react";

export const AddVan = () => {
  const [formData, setFormData] = useState({
    vanModel: "",
    vanType: "",
    seats: "",
    price: "",
    fuelEfficiency: "",
    fuelType: "",
    transmission: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data to send to the backend
    const data = new FormData();
    data.append("vanModel", formData.vanModel);
    data.append("vanType", formData.vanType);
    data.append("seats", formData.seats);
    data.append("price", formData.price);
    data.append("fuelEfficiency", formData.fuelEfficiency);
    data.append("fuelType", formData.fuelType);
    data.append("transmission", formData.transmission);
    data.append("description", formData.description);
    if (image) {
      data.append("image", image); // Attach image file
    }

    try {
      const response = await fetch(
        "https://your-backend-api-url.com/api/vans",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        alert("Van added successfully!");
        setFormData({
          vanModel: "",
          vanType: "",
          seats: "",
          price: "",
          fuelEfficiency: "",
          fuelType: "",
          transmission: "",
          description: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        alert("Failed to add van");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the van.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Van Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="vanModel"
              className="block text-sm font-medium text-gray-700"
            >
              Van Model
            </label>
            <input
              type="text"
              id="vanModel"
              name="vanModel"
              value={formData.vanModel}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="vanType"
              className="block text-sm font-medium text-gray-700"
            >
              Van Type
            </label>
            <select
              id="vanType"
              name="vanType"
              value={formData.vanType}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a type</option>
              <option value="Mini">Mini</option>
              <option value="Luxury">Luxury</option>
              <option value="Cargo">Cargo</option>
            </select>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="fuelEfficiency"
              className="block text-sm font-medium text-gray-700"
            >
              Fuel Efficiency
            </label>
            <input
              type="text"
              id="fuelEfficiency"
              name="fuelEfficiency"
              value={formData.fuelEfficiency}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Van Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Van Photos
          </label>
          <div className="mt-1 flex items-center space-x-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
              />
            ) : (
              <div className="h-20 w-20 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md">
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
              className="px-4 py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Van
        </button>
      </form>
    </div>
  );
};
