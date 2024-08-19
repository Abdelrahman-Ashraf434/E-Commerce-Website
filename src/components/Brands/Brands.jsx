import { useEffect, useState } from "react";
import classes from "./Brands.module.css";
import Helmet from "helmet"
export default function Brands() {
  const TITLE = "Brands";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <h1>Brands</h1>
    </>
  );
}
