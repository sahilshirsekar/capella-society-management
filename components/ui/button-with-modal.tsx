"use client";

import { useState } from "react";

interface ButtonWithModalProps {
  buttonText?: string; // Optional prop for the button text
  buttonClassName?: string; // Optional prop for custom button styling
}

export default function ButtonWithModal({buttonText = "Login", // Default value for buttonText
  buttonClassName = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800", 
}: ButtonWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Login Button */}
      <button
        onClick={toggleModal}
        className={buttonClassName}>
        {buttonText}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg text-black shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  onClick={() => alert("Redirect to Register Page")}
                >
                  Register
                </a>
              </p>
            </div>
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}