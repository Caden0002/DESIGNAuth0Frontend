// src/components/Callback.jsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate("/"); // Redirect to Home after successful login
      } else if (error) {
        console.error("Authentication error:", error);
      }
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-2xl">Redirecting... Please wait.</h2>
      {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
    </div>
  );
};

export default Callback;
