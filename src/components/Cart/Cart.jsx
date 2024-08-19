import { useEffect, useState } from "react";
import classes from "./Cart.module.css";
import Helmet from "helmet";

export default function Cart() {
  const TITLE = "Cart";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <h1>Cart</h1>
    </>
  );
}
