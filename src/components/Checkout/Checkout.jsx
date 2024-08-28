import { useContext, useEffect, useState } from "react";
import classes from "./Checkout.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Helmet from "helmet";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { getPayment, cartId } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);

  // Set the document title
  const TITLE = "Checkout";
  useEffect(() => {
    document.title = TITLE;
  }, []);

  const initialValues = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };

  const validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
        .required("Phone is required"),
      details: Yup.string().required("Address details are required"),
      city: Yup.string().required("City is required"),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const url = isOnline
          ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5137`
          : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
        const res = await getPayment(url, values);

        if (res.status === "success") {
          if (isOnline && res.session && res.session.url) {
            window.location.href = res.session.url; // Redirect to payment gateway
          } else {
            toast.success("Payment done successfully");
            setTimeout(() => {
              navigate("/allorders");
            }, 2000);
          }
        } else {
          toast.error("Payment failed. Please try again.");
        }
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("An error occurred during the payment process.");
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout:</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="shippingAddress.phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingAddress.phone}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.touched.shippingAddress?.phone && formik.errors.shippingAddress?.phone && (
            <div className="text-red-600">{formik.errors.shippingAddress.phone}</div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="shippingAddress.details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.details}
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your address details
          </label>
          {formik.touched.shippingAddress?.details && formik.errors.shippingAddress?.details && (
            <div className="text-red-600">{formik.errors.shippingAddress.details}</div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="shippingAddress.city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.city}
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your city
          </label>
          {formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city && (
            <div className="text-red-600">{formik.errors.shippingAddress.city}</div>
          )}
        </div>
        <div className="mb-5">
          <input
            type="checkbox"
            name="isOnline"
            id="isOnline"
            onChange={() => setIsOnline(!isOnline)}
            checked={isOnline}
          />
          <label htmlFor="isOnline" className="ml-2">
            Pay Online
          </label>
        </div>
        <button type="submit" className="btn btn-green">
          {isOnline ? "Pay Online" : "Pay Cash"}
        </button>
      </form>
    </>
  );
}