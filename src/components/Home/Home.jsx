import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import Helmet from "helmet";
export default function Home() {
  const TITLE = "Home";
  (async function Helmet() {
    <Helmet>{(document.title = TITLE)}</Helmet>;
  })();
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
