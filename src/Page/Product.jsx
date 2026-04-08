import React , {useEffect, useState} from 'react'
import './Product.css'
import Nav from '../Component/Nav'
import logo from '../assets/logo.jpg'
import { FaBell,FaSearch,FaShoppingCart  } from "react-icons/fa";
import { FaBagShopping } from 'react-icons/fa6';
import Shopnav from '../Component/Shop-nav'
import axios from 'axios'
import {
  CircularProgress,
} from "@mui/material";
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {FiHeart} from "react-icons/fi"

const Home = () => {

  const [data, setData] = useState([])
    const [loading , setLoading] = useState(true)
    const { id } = useParams();
    const [message, setMessage] = useState("")
    const [addedId, setAddedId] = useState([])
    const navigate = useNavigate()

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

//ADD to Fav

  const handleFavorite = async (productId) => {
  try {
    const token = localStorage.getItem("token")

    if (!token) {
    alert("Please login to add items to cart")
    navigate("/log")
    return
  }

    const res = await fetch("http://localhost:3000/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }

    alert("Added to favorites ")
    console.log(data)

  } catch (error) {
    console.error(error.message)
    alert(error.message)
  }
}


     if (loading) return <CircularProgress  sx={{
         margin : '15% 50%', color:'red'
    }}  />


  return (
    <div className='product'>

      {message && (
        <div className='toast'>
               {message}
        </div>

      )}
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
                <FaBell size={20}/>
              </div>
              </div>
      </div>

      <Shopnav/>

      <h2 style={{textAlign:"center", marginBottom:'20px'}}>All</h2>

      <div className="input-wrapperr">
                               <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-iccon'/>
                               <input
                             className="bran-input"
                             type="text"
                             placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                           />
     </div>

              <div className="input-wrapper">
               <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-icoon'/>
               <input
             className="bran-inputtt"
             type="text"
             placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
           />
              </div>


      <div className='product-p'>
        {data.map((info) => (
        <div key ={info._id} className="product-card"> 
          
          <div>
              <img src={info.imageUrl}  alt="" className='vin-im' />
          </div>
            <h4 className="vin-h3">
             {info.brand}
            </h4>
          

          <h2 className='shop-name'>
            {info.name}
          </h2>

             <h2 className='price'>${info.price}</h2>

  


          <button className='button' onClick={() => addToCart(info)}><FaShoppingCart color='#9c690a' size={18} style={{marginRight:'6px'}}/> {addedId.includes(info._id) ? "Added ✓✓" : "Add to Cart"}</button>
         
         <button onClick={() => handleFavorite(info._id)} className='btn-fave'><FiHeart className='de-icon' size={23} style={{marginLeft:'90%'}}/></button>

            
        
        </div>
      ))}

    </div>


    </div>
  )
}

export default Home
