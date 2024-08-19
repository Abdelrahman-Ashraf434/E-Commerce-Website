import { useEffect, useState } from "react";
import classes from "./Categories.module.css";
import Helmet from "helmet";
export default function Categories() {
  const TITLE = "Categories";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <h1>Categories</h1>
    </>
  );
}
