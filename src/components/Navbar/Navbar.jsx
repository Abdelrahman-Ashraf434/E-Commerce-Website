import { useContext, useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/freshcart-logo.svg";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
export default function Navbar() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  function handleLogout() {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  }
  return (
    <>
      <nav className="bg-gray-100 p-4 static lg:fixed top-0 left-0 right-0 start-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-center flex-col lg:justify-between lg:flex-row ">
            <div className="flex items-center gap-3 flex-col lg:flex-row">
              <Link to="" className="">
                <img src={Logo} alt="Fresh Cart Logo" />
              </Link>
              {accessToken && (
                <ul className="flex flex-col gap-2 lg:flex-row items-center">
                  <li>
                    <NavLink to={"/"} className="p-2 ">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/product"} className="p-2 ">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/categories"} className="p-2 ">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/brands"} className="p-2 ">
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/cart"} className="p-2 ">
                      <button
                        type="button"
                        class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white  rounded-lg  focus:ring-4 focus:outline-none active"
                      >
                        <i className="fa fa-cart-shopping"></i>
                        <span class="sr-only">Notifications</span>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {numOfCartItems}
                        </div>
                      </button>
                    </NavLink>
                  </li>

                  <li>
                    <a href="" className=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                  </li>
                </ul>
              )}
            </div>
            <div className="flex items-center gap-3 flex-col lg:flex-row justify-center">
              <ul className="flex flex-col lg:flex-row gap-2 items-center">
                {accessToken ? (
                  <li>
                    <Link onClick={handleLogout} className="p-2 ">
                      Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link className="p-2" to={"/login"}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <NavLink className="p-2" to={"/register"}>
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <a href="" className="fab fa-facebook mx-2"></a>
                  <a href="" className="fab fa-twitter mx-2"></a>
                  <a href="" className="fab fa-youtube mx-2"></a>
                  <a href="" className="fab fa-instagram mx-2"></a>
                  <a href="" className="fab fa-tiktok mx-2"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
