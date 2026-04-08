
import './Hero-shop.css'
import { FaArrowRight } from 'react-icons/fa'
import React , {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import {
  CircularProgress,
} from "@mui/material";
import { FaBagShopping } from 'react-icons/fa6';
import StarRating from '../Component/StatRating'


const Heroshop = () => {
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
    alert("error.response?.data || error.message")
    
  } catch (error) {
    console.log(error.response?.data || error.message)
  }
} 

//ADD to Fav

     if (loading) return <CircularProgress  sx={{
         margin : '15% 50%', color:'red'
    }}  />


  return (
    <div className='heroshop'>
      <div className="intro">
        <h3>Top Picks For You</h3>
        <h5><Link to='/product' style={{textDecoration:'none', color:'inherit'}}>View All <FaArrowRight/></Link></h5>
      </div>

      <div className="card">
        {data.slice(0, 6).map((info) => (
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
                           <button nClick={() => addToCart(info)}>  <FaBagShopping size={20} style={{color:'white',}}/></button>
                          </div>
          </div>

          </div>

        ))}
      </div>
      
    </div>
  )
}

export default Heroshop
