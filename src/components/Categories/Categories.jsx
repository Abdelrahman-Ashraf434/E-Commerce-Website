import { useEffect, useState } from "react";
import classes from "./Categories.module.css";
import Helmet from "helmet";
import axios from "axios";
import Loader from "../Loader/Loader";
export default function Categories() {
  const TITLE = "Categories";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      console.log(data.data);
      setCategories(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <section className="">
        <div className="container mx-auto">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row justify-center px-4">
              {categories.map((category, idx) => (
                <div className="w-1/4 flex flex-col items-center border rounded-lg m-2 justify-center cardShadow" key={idx}>
                  <div className="w-full h-64 flex justify-center items-center border rounded-lg ">
                    <img
                      className="object-cover h-full w-full rounded-lg"
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                  <p className="mt-4 text-center text-lg font-semibold text-green-700">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
