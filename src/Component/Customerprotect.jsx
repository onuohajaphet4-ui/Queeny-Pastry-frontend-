import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const User = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Token expired, please login again");

      return <Navigate to="/" />;
    }

  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" />;
  }

  return children;
};
export default User;