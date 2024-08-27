import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const endpoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const { accessToken } = useContext(AuthContext);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const headers = {
    token: accessToken,
  };
  useEffect(() => {
    accessToken && getCart();
  }, [accessToken]);
  async function getCart() {
    try {
      const { data } = await axios.get(endpoint, { headers });
      console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
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
      setNumOfCartItems(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(
        `${endpoint}/${productId}`,{headers}
      );

      console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data)
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  return (
    <CartContext.Provider
      value={{ numOfCartItems, cartDetails, addToCart, getCart,removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
