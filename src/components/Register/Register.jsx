import { useEffect, useState } from "react";
import classes from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const { data } = async function handleRegister(values) {
    console.log("Submit", values);
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be more than 3 char")
      .max(15)
      .required("Name is Required"),
    email: Yup.string().email().required("Email is Required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/i)
      .required("Phone is Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9_]{2,8}$/,
        "Password should matches the conditions"
      )
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Repassword must be matches")
      .required("Repassword is Required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: data,
  });
  /*function validateForm(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length <= 3) {
      errors.name = "Length of Name must be at least 3 chars";
    } else if (values.name.length > 15) {
      errors.name = "Length of Name must be at max 15 chars";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.phone) {
      errors.phone = "Phone is required";
    } else if (!/^(002)?01[0125][0-9]{8}$/i.test(values.phone)) {
      errors.phone = "Invalid Phone Number";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (values.password.length <= 3) {
      errors.password = "Length of password must be at least 3 chars";
    } else if (values.password.length > 8) {
      errors.password = "Length of password must be at max 8 chars";
    } else if (!/^[A-Z][a-z0-9_]$/i.test(values.phone)) {
      errors.password = "Password must be starts with Cap.....";
    }
    if (!values.rePassword) {
      errors.rePassword = "rePassword is required";
    } else if (values.rePassword != values.password) {
      errors.rePassword = "password must be matches";
    }
    return errors;
  }
*/
  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Register:</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your name
          </label>
          {formik.errors.name && formik.touched.name && (
            <div className="text-red-600">{formik.errors.name}</div>
          )}
        </div>
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
            type="phone"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-red-600">{formik.errors.phone}</div>
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your re-password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="text-red-600">{formik.errors.rePassword}</div>
          )}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn btn-green"
        >
          Register
        </button>
      </form>
    </>
  );
}
