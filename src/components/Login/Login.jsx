import { useContext, useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Helmet from "helmet";
export default function Login() {
  const { setAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const TITLE = "Sign-in";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9_]{2,8}$/,
        "Password should matches the conditions"
      )
      .required("Password is Required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });
  async function handleLogin(values) {
    console.log("Submit", values);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      console.log(data);
      if (data.message === "success") {
        setAccessToken(data.token);
        localStorage.setItem("accessToken", data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Login:</h1>
      </div>
      {error && (
        <div className="alert alert-error mb-3 lg:w-1/2  mx-auto">{error}</div>
      )}
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-600">{formik.errors.email}</div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-600">{formik.errors.password}</div>
          )}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn btn-green"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </>
  );
}
