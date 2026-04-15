 import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Swiper.css";
import { Link } from "react-router-dom";
import cakee from "../assets/cakee.jpg";
import chin from "../assets/hero-chin.jpg";
import small from "../assets/hero-small.jpg";
import cake from "../assets/cakee.jpg";
import meat from "../assets/hero-meat.jpg";
import { FaBagShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  const [search, setSearch] = useState("");

  
  const slides = [
    {
      image: cakee,
      title: "🎂 Cakes for Every Occasion",
      desc: "Soft, rich, and freshly baked to perfection.",
      button: "Shop Now",
      link: "/product",
    },
    {
      image: chin,
      title: "🎉 Snacks for Every Occasion",
      desc: "Crunchy chinchin, meat pies, and more.",
      button: "Shop Now",
      link: "/product",
    },
    {
      image: small,
      title: "🔥 Party Small Chops",
      desc: "Freshly made for the perfect bite every time.",
      button: "Shop Now",
      link: "/product",
    },
  ];

  
  const categories = [
    {
      name: "Cakes",
      image: cake,
      link: "/product/section/Cake",
    },
    {
      name: "Snacks",
      image: chin,
      link: "/product/section/Snack",
    },
    {
      name: "Pastries",
      image: meat,
      link: "/product/section/Pastries",
    },
    {
      name: "Chops",
      image: small,
      link: "/product/section/Small-chop",
    },
    
  ];

  
  
  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="slider-container">

             <div className="input-wrapperr">
                                                 <FaSearch   style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-iccon'/>
                                                 <input
                                    type="text"
                                    className="bran-input"
                                     placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                                </div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 10000 }}
        loop
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="swiper"
            style={{
              borderRadius: "15px",
              backgroundImage: `linear-gradient(
                rgba(0,0,0,0.3),
                rgba(0,0,0,0.3)
              ), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="slide">
              <div className="slide-text">
                <h1>{slide.title}</h1>

                <hr
                  style={{
                    backgroundColor: "black",
                    marginRight: "50%",
                  }}
                />

                <p>{slide.desc}</p>

                <Link to={slide.link}>
                  <button>
                    {slide.button}
                    <FaBagShopping size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     

      
      <div className="fflex">
        <div className="input-wrapper">
          <FaSearch className="input-icon" />

          <input
            type="text"
            className="bran-inputt"
             placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="fff">
          {filteredCategories.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="ff">
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
              </div>
            </Link>
          ))}

          {/* NO RESULT */}
          {filteredCategories.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "gray",
                width: "100%",
                marginTop: "15px",
              }}
            >
              No Category Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;