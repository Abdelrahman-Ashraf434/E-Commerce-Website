import { useEffect, useState } from "react";
import classes from "./MainSlider.module.css";
import image1 from "../../assets/images/grocery-banner.png";
import image2 from "../../assets/images/grocery-banner-2.jpeg";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true
  };
  const images = [
    {
      src: slide1,
      label: "image1",
    },
    {
      src: slide2,
      label: "image2",
    },
    {
      src: slide3,
      label: "image3",
    },
  ];
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="row">
            <div className="w-2/3">
              <Slider {...settings}>
                {images.map((img, idx) => (
                  <img className="h-[400px]" src={img.src} alt={img.label} />
                ))}
              </Slider>
            </div>
            <div className="w-1/3">
              <img className="h-[200px]" src={image1} alt="" />
              <img className="h-[200px]" src={image2} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
