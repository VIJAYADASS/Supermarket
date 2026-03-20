import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 
import { CartProvider } from "./Context/CartContext";

import ProtectedRoute from "./Components/ProtectedRoute";
 
import Login     from "./Pages/Login";
import Signup    from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Payment   from "./Pages/Payment";
import Success   from "./Pages/Success";
import Feedback  from "./Pages/Feedback";
import Logout    from "./Pages/Logout";
 
export default function App() {
  return (
    
    <CartProvider>
 
      <BrowserRouter>
        <Routes>
 
         
          <Route path="/login"  element={<Login />}  />
          <Route path="/signup" element={<Signup />} />
 
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
 
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
 
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
 
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
 
          <Route
            path="/final"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
 
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
 
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
 