import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, allProducts, getTotal } from "../Context/CartContext";

export default function Payment() {
  const [method, setMethod] = useState("card");

  const navigate          = useNavigate();
  const { cart, checkout } = useCart();

  
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({
      ...allProducts.find(p => p.id === Number(id)),
      qty,
    }))
    .filter(Boolean);

  const total = getTotal(cart);

  const methods = [
    { id: "card", icon: "💳", label: "Credit / Debit Card" },
    { id: "upi",  icon: "📱", label: "UPI / Wallet"        },
    { id: "cod",  icon: "💵", label: "Cash on Delivery"    },
  ];

  function handlePay() {
    checkout();             
    navigate("/success");    
  }

  return (
    <div className="min-h-screen bg-green-50">

      
      <div className="bg-white border-b-4 border-green-600 px-6 h-16 flex items-center shadow-md">
        <span className="text-xl font-black text-green-600">🛒 FreshMart — Checkout</span>
      </div>

      <div className="max-w-xl mx-auto px-5 py-8">
        <h1 className="text-2xl font-black text-gray-800 mb-1">💳 Checkout</h1>
        <p className="text-gray-400 text-sm mb-7">Review your order and pick a payment method</p>

       
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
          <h3 className="text-base font-extrabold text-gray-700 mb-4">📦 Order Summary</h3>

          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-50 last:border-0"
            >
              <span>{item.emoji} {item.name} × {item.qty}</span>
              <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="flex justify-between pt-4 border-t-2 border-gray-200 mt-2 text-lg font-black text-green-600">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-base font-extrabold text-gray-700 mb-4">💳 Payment Method</h3>
          <div className="flex flex-col gap-3">
            {methods.map(m => (
              <label
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center gap-3 px-4 py-3 border-2 rounded-xl cursor-pointer font-bold text-sm transition-all
                  ${method === m.id
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-green-300"}`}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="accent-green-600"
                />
                <span className="text-xl">{m.icon}</span>
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        
        <button
          onClick={handlePay}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-extrabold text-base rounded-xl transition-all hover:-translate-y-0.5"
        >
          ✅ Pay ${total} Now
        </button>
      </div>
    </div>
  );
}