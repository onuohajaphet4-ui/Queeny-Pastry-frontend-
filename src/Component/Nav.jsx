import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'
import { FaHome, FaStore, FaShoppingCart, FaUser, FaBell } from "react-icons/fa";
import logo from '../assets/logo.jpg'
import {useNavigate} from 'react-router-dom'
import { FaBagShopping } from 'react-icons/fa6';

const Home = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
  console.log("CLICKED"); // 👈 add this
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/log");
    return;
  }

  if (user?.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/customer");
  }
};

  return (

    <div>
    <div className='nav'>
      <div className="logo">
        <img src={logo} alt="" />

        <div className="hello">
          <h4>Hello,<span>User</span></h4>
          <p>What will you like to get today?</p>
        </div>
      </div>

        <ul>
           <Link to='/' style={{textDecoration:'none', color:'inherit'}}> <li> <FaHome size={20} className='icon'/><span>Home</span></li></Link>
           <Link to='/product' style={{textDecoration:'none', color:'inherit'}}> <li> <FaStore size={20} className='icon'/><span>Product</span></li></Link>
           <Link to='/cart' style={{textDecoration:'none', color:'inherit'}}> <li><FaShoppingCart size={20} className='icon'/><span>Cart</span></li></Link>
           <li onClick={handleAccountClick} style={{cursor: "pointer"}}><FaUser size={20} className='icon'/><span>Account</span></li>
        </ul>

        <div className="iconss" style={{marginLeft:'30%'}}>
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

    <div className="smallnav">

      <ul>
           <Link to='/' style={{textDecoration:'none', color:'inherit'}}> <li> <FaHome size={20} className='iconb'/><span>Home</span></li></Link>
           <Link to='/product' style={{textDecoration:'none', color:'inherit'}}> <li> <FaStore size={20} className='iconb'/><span>Product</span></li></Link>
           <Link to='/cart' style={{textDecoration:'none', color:'inherit'}}> <li><FaShoppingCart size={20} className='iconb'/><span>Cart</span></li></Link>
           <li className='iconb' onClick={handleAccountClick} style={{cursor: "pointer"}}><FaUser size={20} className='icon'/><span>Account</span></li>
        
        </ul>


    </div>


    </div>
  )
}

export default Home
