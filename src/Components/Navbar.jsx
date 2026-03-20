import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Navbar({ onCartOpen }) {
  const { user, cart, logout } = useCart();
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

   
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate    = useNavigate();
  const dropdownRef = useRef(null);  

   
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   
  function handleLogout() {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  }

   
  const initials = user
    ? user.trim().split(" ").map(w => w[0].toUpperCase()).slice(0, 2).join("")
    : "?";

  return (
    <nav className="bg-white border-b-4 border-green-600 px-6 flex items-center justify-between h-16 sticky top-0 z-50 shadow-md">

       
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-xl font-black text-green-600 cursor-pointer select-none hover:opacity-80 transition-opacity"
        title="Go to Home"
      >
        <span className="text-3xl">🛒</span>
        <span>FreshMart</span>
      </div>

       
      <div className="flex items-center gap-4">

         
        <div className="relative" ref={dropdownRef}>
  
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-green-50 transition-colors group"
            title="Account options"
          >
             
            <span className="w-8 h-8 rounded-full bg-green-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
              {initials}
            </span>
             
            <span className="text-sm font-bold text-gray-600 hidden sm:block">
              Hi, {user}! 👋
            </span>
             
            <svg
              className={`w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

           
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

               
              <div className="px-4 py-3 bg-green-50 border-b border-green-100">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-green-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                    {initials}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-gray-800">{user}</p>
                    <p className="text-xs text-gray-400">FreshMart Member</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">

                {/* Home */}
                <button
                  onClick={() => { setDropdownOpen(false); navigate("/dashboard"); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-left"
                >
                  <span className="text-base">🏠</span> Home
                </button>
 
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-left"
                >
                  <span className="text-base">📦</span> My Orders
                </button>

                 
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-left"
                >
                  <span className="text-base">👤</span> Profile
                </button>

                 
                <div className="border-t border-gray-100 my-1" />

                 
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                >
                  <span className="text-base">🚪</span> Log Out
                </button>
              </div>
            </div>
          )}
        </div>

     
        <button
          onClick={onCartOpen}
          className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
        >
          🛍️ Cart
          {cartCount > 0 && (
            <span className="bg-yellow-400 text-gray-900 font-black text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}