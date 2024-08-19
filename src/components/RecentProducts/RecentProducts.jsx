import { useEffect, useState } from "react";
import classes from "./RecentProducts.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getRecentProduct() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(data.data);
      setProducts(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getRecentProduct();
  }, []);
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
