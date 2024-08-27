import { useEffect, useState } from "react";
import classes from "./SubCategories.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
export default function SubCategories() {
  const [subcategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  async function getSubCategories(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      console.log(data.data);
      setSubCategories(data.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setSubCategories([]);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getSubCategories(id);
  }, [id]);

  return (
    <>
      <h1>SubCategories</h1>
    </>
  );
}
