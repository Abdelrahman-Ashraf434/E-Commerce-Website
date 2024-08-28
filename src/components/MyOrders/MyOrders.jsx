import { useContext, useEffect, useState } from "react";
import classes from "./MyOrders.module.css";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
export default function MyOrders() {
  const { userId } = useContext(CartContext);
  async function getMyOrders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   userId && getMyOrders();
  }, [userId]);
  return (
    <>
      <h1>MyOrders</h1>
    </>
  );
}
