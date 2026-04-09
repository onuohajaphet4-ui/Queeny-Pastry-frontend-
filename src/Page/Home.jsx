
import Nav from '../Component/Nav'
import './Home.css'
import logo from '../assets/logo.jpg'
import { FaArrowRight, FaBell,FaSearch  } from "react-icons/fa";
import { FaBagShopping } from 'react-icons/fa6';
import Swiper from '../Component/Swiper'
import Heroshop from '../Component/Hero-shop'
import {Link} from 'react-router-dom'
import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'
const Home = () => {
  const [data, setData] = useState([])
     const [loading , setLoading] = useState(true)
      const { id } = useParams();
      const [message, setMessage] = useState("")
      const [addedId, setAddedId] = useState([])
      const navigate = useNavigate()
      const [search, setSearch] = useState("");
  
      useEffect(() => {
        axios.get("http://localhost:3000/api/product")
        .then((res) => {
          setData(res.data.products)
           setLoading(false)
  
        }).catch((error) => {
           console.error (error?.response?.data?.message || "Request failed")
        })
      }, [])
  
  
   const addToCart = async (info) => { 
    const token = localStorage.getItem("token")
  
    if (!token) {
      alert("Please login to add items to cart")
      navigate("/log")
      return
    }
  
    try {
      await axios.post("http://localhost:3000/api/cart",
        {
           productId: info._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  
      setMessage(`${info.name} added to cart`)
      setAddedId(prev => prev.includes(info._id)? prev : [...prev,info._id])
      
      
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  } 
  
  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  
     const filteredCards = data.filter((b) =>
      b.name.toLowerCase().includes(search)
    );
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
                         <FaSearch  onChange={handleSearch} style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-iccon'/>
                         <input
                       className="bran-input"
                       type="text"
                       placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                       
                     />
                        </div>

               <hr />
      <Swiper/>

      <motion.div
                                 initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                        >
      <div className='heroshop'>
            {message && (
              <div className='toast'>
                     {message}
              </div>
      
            )}
            <div className="intro">
              <h3>Top Picks For You</h3>
              <h5><Link to='/product' style={{textDecoration:'none', color:'inherit'}}>View All <FaArrowRight/></Link></h5>
            </div>
      
            <div className="card">
              {filteredCards.slice(0, 6).map((info) => (
                <div key ={info._id} className="ship-card">
      
                  <button className='button'>
                    Available
                  </button>
                  <div>
                    <img src={info.imageUrl}  alt="" className='vin-im' />
                </div>
      
                <h4>{info.name}</h4>
                <h2>${info.price}</h2>
      
              <div className="vis">
                
      
                <div className="iicon">
                                 <button onClick={() => addToCart(info)}>  <FaBagShopping size={20} style={{color:'white',}}/></button>
                </div>
              </div>
      
                </div>
      
              ))}
            </div>
            
          </div>
          </motion.div>
      
   
          
         
      
    </div>
  )
}

export default Home
