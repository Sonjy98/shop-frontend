import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("auth_token"));

  return (
    <header className="bg-gray-100 shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left side links */}
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-pink-500">Home</Link>
        <Link to="/browse" className="text-gray-700 hover:text-pink-500">Browse</Link>
        <Link to="/vendors" className="text-gray-700 hover:text-pink-500">Vendors</Link>
        <Link to="/analytics" className="text-gray-700 hover:text-pink-500">Analytics</Link>
      </div>

      {/* Right side login or user menu */}
      <div className="relative">
        {!loggedIn ? (
          <Link to="/login" className="text-gray-700 hover:text-pink-500">Login</Link>
        ) : (
          <div className="group inline-block relative">
            <button className="text-gray-700 hover:text-pink-500 font-semibold">
              <span role="img" aria-label="profile">👤</span>
              My Account
            </button>
            <ul className="absolute hidden group-hover:block bg-white border rounded shadow-md right-0 w-40 z-10 text-sm">
              <li>
                <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("auth_token");
                    setLoggedIn(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
