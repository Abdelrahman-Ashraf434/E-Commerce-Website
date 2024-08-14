import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import Product from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Notfound from "./components/Notfound/Notfound";
import Error from "./components/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/footer",
          element: <Footer />,
        },
        {
          path: "/loader",
          element: <Loader />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
