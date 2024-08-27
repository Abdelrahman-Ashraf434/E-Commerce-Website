import { useEffect, useState } from "react";
import classes from "./Products.module.css";
import Helmet from "helmet";
import RecentProducts from "../RecentProducts/RecentProducts";
export default function Products() {
  const TITLE = "Product";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <RecentProducts />
    </>
  );
}
