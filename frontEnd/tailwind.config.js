/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mainBackgroundColor:
          "radial-gradient(circle, #623037 0%, #3A1D19 50%, #201207 100%)",
      },
      backgroundSize: {
        full: "100% 100%", // Ensures the background covers the entire area.
      },
      backgroundRepeat: {
        noRepeat: "no-repeat", // Prevents the background from repeating.
      },
    },
  },
  plugins: [tailwindScrollbar],
};
