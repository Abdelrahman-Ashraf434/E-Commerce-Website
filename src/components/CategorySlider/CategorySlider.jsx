import { useEffect, useState } from "react";
import classes from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay:true
  };
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
      <section className="py-20">
        <div className="container mx-auto">
            <Slider {...settings}>
              {categories.map((category, idx) => (
                <div key={idx}>
                  <img
                    className={`mb-2 ${classes.CategoryImage}`}
                    src={category.image}
                    alt=""
                  />
                  <h2>{category.name}</h2>
                </div>
              ))}
            </Slider>
        </div>
      </section>
    </>
  );
}
