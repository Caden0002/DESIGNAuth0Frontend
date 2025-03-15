// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Helper function to decode a JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
}

const Home = () => {
  const { logout, getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState("");
  const [tokenExp, setTokenExp] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        if (isMounted) {
          setToken(accessToken);
          const decoded = parseJwt(accessToken);
          if (decoded && decoded.exp) {
            setTokenExp(decoded.exp);
          }
          console.log("Access Token:", accessToken);
        }
      } catch (err) {
        console.error("Failed to get access token", err);
      }
    };

    fetchToken();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="relative min-h-screen flex bg-stone-300">
      <div className="container max-w-screen-xl mx-auto flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">🏠 Home Page</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome, {user?.name}! You’re successfully logged in.
        </p>

        {user && (
          <div className="mb-6 text-sm text-left break-words max-w-xl bg-white p-4 rounded-md shadow-md">
            <p className="mb-2 font-semibold">User Details:</p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        {token && (
          <div className="mb-6 text-sm text-left break-words max-w-xl bg-white p-4 rounded-md shadow-md">
            <p className="mb-2 font-semibold">🔑 Access Token:</p>
            <code>{token}</code>
            {tokenExp && (
              <p className="mt-4">
                <strong>Expires At:</strong>{" "}
                {new Date(tokenExp * 1000).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
