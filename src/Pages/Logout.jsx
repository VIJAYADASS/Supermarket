import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Logout() {
  const navigate    = useNavigate();
  const { user, logout } = useCart();

  function handleLogout() {
    logout();                  
    navigate("/login");      
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-900 to-green-700 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl p-12 text-center max-w-sm w-full shadow-2xl">

        <span className="text-6xl block mb-4">🌿</span>
        <h2 className="text-2xl font-black text-gray-800 mb-2">
          Thanks, {user}!
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Your order is on its way.<br />What would you like to do next?
        </p>

        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all hover:-translate-y-0.5"
          >
            🏠 Go to Home Page
          </button>

          
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200 font-extrabold rounded-xl transition-colors"
          >
            🚪 Log Out
          </button>
        </div>
      </div>
    </div>
  );
}