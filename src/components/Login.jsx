// src/components/Login.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithPopup } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-stone-200">
      <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Auth0 Testing</h1>
        <p className="mb-8 text-lg text-gray-600">Please log in to continue</p>
        <button
          onClick={handleLogin}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
