import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AccountAuthModal = ({
  isOpen,
  onClose,
  isSignUp,
  toggleMode,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // React Router's navigation hook

  if (!isOpen) return null;

  const handleForgotPassword = () => {
    alert("Functionality to be implemented soon");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setMessage(""); // Clear previous success messages

    // Input validation before API call
    if (!email || !password || (isSignUp && !fullName)) {
      setError("All fields are required.");
      return;
    }

    try {
      if (isSignUp) {
        // Sign Up logic
        const response = await axios.post(
          "http://localhost:5098/api/Admin/CustomerSignup",
          {
            fullName,
            email,
            password,
          }
        );
        setMessage(response.data.message); // Display success message
        alert("Registration successful!");
        toggleMode(false); // Switch to login mode
      } else {
        // Log In logic
        const response = await axios.post(
          "http://localhost:5098/api/Admin/CustomerLogin",
          {
            email,
            password,
          }
        );

        const { customerId, fullName: userFullName } = response.data;

        // Save user details to localStorage
        localStorage.setItem("customerId", customerId);
        localStorage.setItem("customerName", userFullName);

        setMessage(`Welcome, ${userFullName}!`);
        alert("Login successful!");
        // Pass the email to the parent component
        onSuccess(email);

        // Redirect to the /customer route
        navigate("/customer");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage); // Display error message
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-2">
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>
        <p className="text-center text-gray-600 mb-4">
          {isSignUp
            ? "Welcome! Please sign up to get started."
            : "Welcome back! Please log in."}
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => toggleMode(false)}
            className={`py-1 px-4 rounded-md ${
              isSignUp ? "bg-gray-300 text-gray-700" : "bg-[#6C2A4D] text-white"
            }`}
          >
            No, log me in
          </button>
          <button
            onClick={() => toggleMode(true)}
            className={`py-1 px-4 rounded-md ${
              isSignUp ? "bg-[#6C2A4D] text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            Yes, sign me up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6C2A4D]"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6C2A4D]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6C2A4D]"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#6C2A4D] text-white rounded hover:bg-[#551C3A] transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        {message && (
          <p className="text-green-600 text-center mt-2">{message}</p>
        )}
        {!isSignUp && (
          <p className="text-center mt-2">
            <button
              onClick={handleForgotPassword}
              className="text-[#6C2A4D] hover:underline"
            >
              Forgot password?
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

// Add PropTypes validation
AccountAuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Boolean to control visibility (required)
  onClose: PropTypes.func.isRequired, // Function to close the modal (required)
  isSignUp: PropTypes.bool.isRequired, // Boolean to toggle between Sign Up and Log In (required)
  toggleMode: PropTypes.func.isRequired, // Function to toggle Sign Up / Log In mode (required)
  onSuccess: PropTypes.func.isRequired, // Notify parent component about successful login/signup
};
