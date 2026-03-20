import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar      from "../Components/Navbar";
import Footer      from "../Components/Footer";
import { useCart, allProducts, getTotal } from "../Context/CartContext";
import db          from "../Data/Database.json";

const categories = db.categories;

export default function Dashboard() {

  const [showCart, setShowCart] = useState(false);

  const navigate               = useNavigate();
  const { cart, addToCart, changeQty } = useCart();

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      ...allProducts.find(p => p.id === Number(id)),
      qty,
    }))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-green-50">

      <Navbar onCartOpen={() => setShowCart(true)} />

      <div className="max-w-6xl mx-auto px-5 py-7">

        <div className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-2">
              Fresh Groceries, Delivered! 🚀
            </h2>
            <p className="text-green-100 text-sm sm:text-base">
              Browse fresh produce, dairy, bakery, meat & more.
            </p>
          </div>
          <span className="text-6xl hidden sm:block">🥗</span>
        </div>

        {Object.entries(categories).map(([cat, products]) => (
          <div key={cat} className="mb-10">
            <h3 className="text-xl font-extrabold text-gray-800 mb-4">{cat}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

              {products.map(product => {
                const qty = cart[product.id] || 0;
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl p-4 text-center border-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 relative
                      ${qty > 0
                        ? "border-green-500 bg-green-50"
                        : "border-transparent hover:border-green-300"}`}
                  >
                    {qty > 0 && (
                      <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                        {qty}
                      </span>
                    )}

                    <span className="text-4xl block mb-2">{product.emoji}</span>
                    <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{product.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{product.unit}</p>
                    <p className="text-base font-black text-green-600">${product.price.toFixed(2)}</p>

                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(product.id)}
                        className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-xs font-extrabold py-1.5 rounded-lg transition-colors"
                      >
                        + Add
                      </button>
                    ) : (
                      <div className="mt-2 flex items-center justify-center gap-2">
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="w-6 h-6 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-black flex items-center justify-center transition-colors"
                        >
                          −
                        </button>
                        <span className="font-black text-sm w-4 text-center">{qty}</span>
                        <button
                          onClick={() => changeQty(product.id, +1)}
                          className="w-6 h-6 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-black flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Footer />    
      {showCart && (
        <div
          className="fixed inset-0 bg-opacity-40 z-50 flex justify-end"
          onClick={() => setShowCart(false)}     
        >
          <div
            className="bg-white w-96 max-w-full h-full flex flex-col p-6 overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">🛍️ Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="bg-gray-100 hover:bg-gray-200 rounded-xl w-9 h-9 flex items-center justify-center text-base font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
                <span className="text-5xl mb-3">🛒</span>
                <p className="text-sm">
                  Your cart is empty.<br />Add some items to get started!
                </p>
              </div>
            ) : (
              <>
                
                <div className="flex-1 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-sm font-bold text-green-600">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-6 h-6 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-black flex items-center justify-center transition-colors"
                        >
                          −
                        </button>
                        <span className="font-black text-sm w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, +1)}
                          className="w-6 h-6 rounded-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-black flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t-2 border-gray-200 mt-2">
                  <div className="flex justify-between text-lg font-black mb-4">
                    <span>Total</span>
                    <span>${getTotal(cart)}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      navigate("/payment");   
                    }}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl transition-all hover:-translate-y-0.5"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}