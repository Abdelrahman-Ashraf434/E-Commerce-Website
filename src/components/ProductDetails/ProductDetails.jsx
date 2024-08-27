import { useContext, useEffect, useState } from "react";
import classes from "./ProductDetails.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  async function getProductDetails(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data.data);
      setProductDetails(data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProductDetails({});
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getProductDetails(id);
  }, [id]);
  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    console.log(res);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Something went Wrong");
    }
  }
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row items-center">
              <div className="w-1/3 px-4">
                <Slider {...settings}>
                  {productDetails?.images?.map((src, idx) => (
                    <img key={idx} src={src} alt={productDetails.title} />
                  ))}
                </Slider>
              </div>
              <div className="w-2/3 px-4">
                <h1 className="text-2xl mb-2">{productDetails?.title}</h1>
                <p className="mb-2">{productDetails.description}</p>
                <div className="flex justify-between text-gray-500 font-light mb-2 ">
                  <div>
                    <p className="mb-2">{productDetails?.category?.name}</p>
                    <span>{productDetails.price} EGP</span>
                  </div>
                  <div>
                    <i className="fas fa-star text-yellow-300"></i>
                    <span>{productDetails.ratingAverages}</span>
                  </div>
                </div>
                <button
                  onClick={() => addProductToCart(productDetails.id)}
                  className="btn btn-green w-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <RelatedProducts />
    </>
  );
}
