
import { useCart } from "../Context/CartContext";

function Navbar({ onCartOpen }) {
  
  const { user, cart } = useCart();
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <nav className="bg-white border-b-4 border-green-600 px-6 flex items-center justify-between h-16 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2 text-xl font-black text-green-600">
        <span className="text-3xl">🛒</span> FreshMart
      </div>

  
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-gray-600 hidden sm:block">
          Hi, {user}! 👋
        </span>

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

export default Navbar