

import { createContext, useContext, useState } from "react";
import db from "../Data/Database.json";

export const allProducts = Object.values(db.categories).flat();

export function getTotal(cart) {
  return Object.entries(cart)
    .reduce((sum, [id, qty]) => {
      const product = allProducts.find(p => p.id === Number(id));
      return sum + (product ? product.price * qty : 0);
    }, 0)
    .toFixed(2);
}


const CartContext = createContext(null);


export function CartProvider({ children }) {
  const [user,  setUser]  = useState("");    
  const [cart,  setCart]  = useState({});    
  const [total, setTotal] = useState("0.00");  

   
  function addToCart(id) {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

   
  function changeQty(id, delta) {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  }

   
  function checkout() {
    setTotal(getTotal(cart));
    setCart({});               
  }

   
  function logout() {
    setUser("");
    setCart({});
  }

  
  const value = { user, setUser, cart, setCart, addToCart, changeQty, checkout, logout, total };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

 
export function useCart() {
  return useContext(CartContext);
}