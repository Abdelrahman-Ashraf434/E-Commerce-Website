import { useEffect, useState } from "react";
import classes from "./Brands.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Helmet from "helmet";
export default function Brands() {
  const TITLE = "Brands";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands`
      );
      console.log(data.data);
      setBrands(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-center text-green-500 text-2xl">All Brands</h1>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row m-5 justify-center">
              {brands.map((brand) => (
                <div className="w-1/5 flex flex-col items-center border rounded-lg m-2 justify-center cardShadow">
                  <img className="mb-2" src={brand.image} alt={brand.name} />
                  <p className="text-center">{brand.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
