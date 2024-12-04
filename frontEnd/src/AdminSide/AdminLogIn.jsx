import { useState, useEffect } from "react";
import { AdminHeader } from "./AdminHeader";

export const AdminLogIn = () => {
  const [view, setView] = useState("default"); // "default", "login", "signup"
  const [animationState, setAnimationState] = useState(""); // Animation state: "fade-in" or "fade-out"

  useEffect(() => {
    if (animationState === "fade-out") {
      const timer = setTimeout(() => {
        setAnimationState("fade-in");
      }, 300); // Duration of fade-out
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const changeView = (newView) => {
    setAnimationState("fade-out");
    setTimeout(() => {
      setView(newView);
    }, 300); // Matches fade-out duration
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[2rem]">
      <AdminHeader /> {/* Keep header unchanged */}
      <div
        className={`flex flex-col items-center justify-center shadow-lg rounded-md     p-[2rem]  sm:w-[30rem] md:w-[30rem]  h-[30rem] transition-opacity duration-300 ${
          animationState === "fade-in"
            ? "opacity-100"
            : animationState === "fade-out"
            ? "opacity-0"
            : ""
        }`}
      >
        {/* Default View */}
        {view === "default" && (
          <>
            <h2 className="font-bold text-center text-lg">Hi there!</h2>
            <p className="text-center">
              Let&apos;s get busy and make things happen
            </p>
            <button
              className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] mb-2 mt-[3rem] rounded-md"
              onClick={() => changeView("login")}
            >
              Log In
            </button>
            <button
              className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] rounded-md"
              onClick={() => changeView("signup")}
            >
              Sign Up
            </button>
          </>
        )}

        {/* Login View */}
        {view === "login" && (
          <>
            <h2 className="font-bold text-center text-lg">Hi there!</h2>
            <p className="text-center">
              Let&apos;s get busy and make things happen
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-solid border-black w-full max-w-[20rem] h-[2rem] mb-2 mt-[1rem] p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-solid border-black w-full max-w-[20rem] h-[2rem] p-2 rounded-md"
            />
            <button className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] mt-[1rem] rounded-md">
              Log In
            </button>
            <button
              className=" underline w-full max-w-[10rem] h-[2rem] mt-[1rem] rounded-md"
              onClick={() => changeView("Forgot Password")}
            >
              Forgot Password
            </button>
            <button
              className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] mt-[1rem] rounded-md"
              onClick={() => changeView("default")}
            >
              Back
            </button>
          </>
        )}

        {/* Signup View */}
        {view === "signup" && (
          <>
            <h2 className="font-bold text-center text-lg">Hi there!</h2>
            <p className="text-center">
              Let&apos;s get busy and make things happen
            </p>
            <input
              type="text"
              placeholder="Company ID"
              className="border border-solid border-black w-full max-w-[20rem] h-[2rem] mt-[1rem] p-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-solid border-black w-full max-w-[20rem] h-[2rem] mb-2 mt-2 p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-solid border-black w-full max-w-[20rem] h-[2rem] p-2 rounded-md"
            />
            <button className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] mt-[1rem] rounded-md">
              Sign Up
            </button>
            <button
              className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[10rem] h-[2rem] mt-[1rem] rounded-md"
              onClick={() => changeView("default")}
            >
              Back
            </button>
          </>
        )}

        {/* Forgot Password */}
        {view === "Forgot Password" && (
          <>
            <div className="w-[15rem]">
              <h1 className="font-bold mb-2">Forgot Password</h1>
              <p className="text-sm mb-8">
                We&apos;ve sent a code to your email to verify your
                identity.Please enter the code below to change your password
              </p>
              <input
                type="text"
                placeholder="Enter Email"
                className="border border-solid border-black w-full h-[2rem] p-2 rounded-md mb-2"
              />
              <button className="bg-[#623037] text-white hover:bg-[#ECEFF6] hover:text-black w-full max-w-[15rem] h-[2rem] rounded-md mb-2">
                Sent OTP
              </button>
              <input
                type="text"
                placeholder="Enter OTP"
                className="border border-solid border-black w-full h-[2rem] p-2 rounded-md"
              />
              <button className="bg-[#623037] text-white hover:bg-[#ECEFF6] hover:text-black w-full max-w-[15rem] h-[2rem] mt-[1rem] rounded-md">
                Verify
              </button>
              <button
                className="bg-[#ECEFF6] hover:bg-[#623037] hover:text-white w-full max-w-[15rem] h-[2rem] mt-[1rem] rounded-md"
                onClick={() => changeView("default")}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
