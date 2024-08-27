import { createContext, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = {
    token: localStorage.getItem("accessToken"),
  };
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        endpoint,
        { productId },
        {
          headers,
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
