
import { Navigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function ProtectedRoute({ children }) {
  const { user } = useCart();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}