import { useEffect } from "react";

const Logout = () => {
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Also remove userId if stored

    // Clear the JWT cookie
    document.cookie = "token=; Max-Age=0; path=/";

    // Redirect to login
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
