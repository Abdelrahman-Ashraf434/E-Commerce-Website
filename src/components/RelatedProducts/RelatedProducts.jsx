import { useEffect, useState } from "react";
import classes from "./RelatedProducts.module.css";
import axios from "axios";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
export default function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  
  async function getRelatedProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const res = data.data.filter(
        (product) => product.category.name == category
      );
      console.log(res);
      setProducts(res);
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
    getRelatedProducts();
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
