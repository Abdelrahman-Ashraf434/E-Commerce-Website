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
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Notfound from "./components/Notfound/Notfound";
import Error from "./components/Error/Error";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product",
          element: (
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product-details/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          index: true,
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
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
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
