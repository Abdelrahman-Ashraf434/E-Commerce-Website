import { useEffect, useState } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import Helmet from "helmet";
export default function Product({ product }) {
  const TITLE = "Product";
  <Helmet>{(document.title = TITLE)}</Helmet>;
  return (
    <>
      <div className="w-1/6 px-4 mb-4">
        <Link to={`/product-details/${product.id}/${product.category.name}`}>
          <img className="mb-2" src={product.imageCover} alt={product.title} />
          <span className="mb-2 text-green-500">{product.category.name}</span>
          <h2 className="truncate text-sm font-semibold mb-2">
            {product.title}
          </h2>
          <div className="flex justify-between text-gray-500 font-light">
            <span>{product.price} EGP</span>
            <div>
              <i className="fas fa-star text-yellow-300"></i>
              <span>{product.rating}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
