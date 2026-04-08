import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination , Autoplay} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Swiper.css'
import chin from '../assets/hero-chin.jpg'
import small from '../assets/hero-small.jpg'
import cake from '../assets/cake.jpg'
import cakee from '../assets/cakee.jpg'
import { FaBagShopping } from 'react-icons/fa6';
import Heroswip from './Heroswip'

import {Link} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
const Hero = () => {
    const slides = [
        {
            image:cakee ,
            title:'🎂 Cakes for Every Occasion',
            desc: 'Soft, rich, and freshly baked to perfection Made with quality ingredients for the best taste.Perfect for celebrations or sweet cravings.Every slice is pure delight.',
            button: 'Shop Now ',
            link : '/product',

        },
         {
            image:chin ,
            title:'🎉 Snacks for Every Occasion',
            desc: 'Crunchy chinchin, meat pies, and more.Freshly baked and perfectly made.A mix of sweet and savory bites.Perfect for any time, any mood.',
            button: 'Shop Now ',
            link : '/product',

        },
         
         {
            image:small,
            title:'🔥Party Small Chops',
            desc: 'Golden and crunchy on the outside with a rich, savory filling inside — freshly made for the perfect bite every time. ',
            button: 'Shop Now ',
            link : '/product',

        }
         
    ]
  return (
    <div className='slider-container'>
       <Swiper 
        modules={[Navigation, Pagination , Autoplay]}
        
        autoplay={{delay:10000}}
        loop
        >
            {slides.map((slide, i ) => (
               <SwiperSlide key={i} className='swiper' style={{borderRadius:"15px",backgroundImage:` linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${slide.image})`,backgroundSize:'Cover',backgroundPosition:'center'
               }} >
                 <div className="slide">
    

                    <div className="slide-text">
                        <h1>{slide.title}</h1>
                        <hr style={{color:'black', padding: '1px', backgroundColor:'black', marginRight:'50%'}} />
                        <p>{slide.desc}</p>
                       <Link to={slide.link}> <button>{slide.button}<FaBagShopping size={20} /></button></Link>
                    </div>

                 </div>
                 </SwiperSlide> 
            ))}



       </Swiper>

      <div className="fflex">
         <div className="input-wrapper">
          <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-icon'/>
          <input
        className="bran-inputt"
        type="text"
        placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
      />
         </div>

      

      <Heroswip />
      </div>
    </div>
  )
}

export default Hero
