import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        {error?.statusText || error?.message || "An unknown error occurred."}
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#623037] text-white font-semibold rounded-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};
