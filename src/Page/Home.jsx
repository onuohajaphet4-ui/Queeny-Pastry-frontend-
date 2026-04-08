import React from 'react'
import Nav from '../Component/Nav'
import './Home.css'
import logo from '../assets/logo.jpg'
import { FaBell,FaSearch  } from "react-icons/fa";
import { FaBagShopping } from 'react-icons/fa6';
import Swiper from '../Component/Swiper'
import Heroshop from '../Component/Hero-shop'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>

      <Nav/>
      <div className="navbar">
        <div className="logo">
                <img src={logo} alt="" />
        
                <div className="hello">
                  <h4>Hello,<span>User</span></h4>
                  <p>What will you like to get today?</p>
                </div>
        </div>

        <div className="iconss">
          <Link to='/cart' > 
          <div className="icon">
                 <FaBagShopping size={20}/> 
        </div>
        </Link>

        <div className="icon notification">
           <Link to='/notis'><FaBell size={20}/></Link>
        </div>
        </div>
      </div>

     
               <div className="input-wrapperr">
                         <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-iccon'/>
                         <input
                       className="bran-input"
                       type="text"
                       placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                     />
                        </div>

               <hr />
      <Swiper/>
      <Heroshop/>
      
   
          
         
      
    </div>
  )
}

export default Home
