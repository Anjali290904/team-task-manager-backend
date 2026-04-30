import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ✅ logged in
  return children;
}

export default PrivateRoute;