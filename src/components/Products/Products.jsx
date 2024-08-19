import { useEffect, useState } from "react";
import classes from "./Products.module.css";
import Helmet from "helmet"
export default function Products() {
  const TITLE = "Product";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <h1>Products</h1>
    </>
  );
}
