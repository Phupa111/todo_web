import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-700 mb-6">
            You need to log in to access this page.
          </p>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectRoute;
