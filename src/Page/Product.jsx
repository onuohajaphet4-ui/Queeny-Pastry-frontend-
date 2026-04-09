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
import Filter from '../Dashboard/Customer/Filter'
import {motion} from 'framer-motion'

const Home = () => {

  const [data, setData] = useState([])
    const [loading , setLoading] = useState(true)
    const { id } = useParams();
    const [message, setMessage] = useState("")
    const [addedId, setAddedId] = useState([])
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
      axios.get(`https://queeny-pastry.onrender.com/api/product${sort ? `?sort=${sort}` : ""}`)
      .then((res) => {
        setData(res.data.products)
         setLoading(false)

      }).catch((error) => {
         console.error (error?.response?.data?.message || "Request failed")
      })
    }, [sort])

  const addToCart = async (info) => {

    
  const token = localStorage.getItem("token")

  if (!token) {
    alert("Please login to add items to favorite")
    navigate("/log")
    return
  }

  try {
    await axios.post("https://queeny-pastry.onrender.com/api/cart",
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

    const res = await fetch("https://queeny-pastry.onrender.com/api/favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

   const filteredCards = data.filter((b) =>
    b.name.toLowerCase().includes(search)
  );


     if (loading) return <CircularProgress  sx={{
         margin : '15% 50%', color:'red'
    }}  />


  return (
    <div className='product'>
        <Nav/>
      {message && (
        <div className='toast'>
               {message}
        </div>

      )}
      

      
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
                               onChange={handleSearch}
                             className="bran-input"
                             type="text"
                             placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                           />
     </div>

              <div className="input-wrapper">
               <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='input-icoon'/>
               <input
               onChange={handleSearch}
             className="bran-inputtt"
             type="text"
             placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
           />
              </div>

             <div className='sort'>
               <Filter sort={sort} setSort={setSort} />

             </div>

<motion.div
                           initial={{ opacity: 0, y: 30, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                  >
      <div className='product-p'>
        {filteredCards.map((info) => (
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

             <h2 className='price'>₦{info.price}</h2>

  


          <button className='button' onClick={() => addToCart(info)}><FaShoppingCart color='#9c690a' size={18} style={{marginRight:'6px'}}/> {addedId.includes(info._id) ? "Added ✓✓" : "Add to Cart"}</button>
         
         <button onClick={() => handleFavorite(info._id)} className='btn-fave'><FiHeart className='de-icon' size={23} style={{marginLeft:'90%'}}/></button>

            
        
        </div>
      ))}
      {filteredCards.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No Product Found</p>
      )}

    </div>
    </motion.div>


    </div>
  )
}

export default Home
