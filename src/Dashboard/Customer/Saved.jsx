import {Link} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { FaW } from 'react-icons/fa6';
import './Saved.css'
const Saved = () => {
    const [favorites, setFavorites] = useState([])
  const [loading , setLoading] = useState(false)

   

 const fetchFavorites = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await fetch("https://queeny-pastry.onrender.com/api/favorite", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await res.json()
    setFavorites(data)
    console.log(data)


  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchFavorites()
  }, [])

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
        
  const deleteFav = async () =>{
   
              const confirm = window.confirm('Are you sure want to delete this image?')
      if (!confirm) return;
      
      try {
         await axios.delete (`https://queeny-pastry.onrender.com/api/favorite/${_id}`,{
          headers: {
        "Authorization": `Bearer ${token}`
      }
      })
         
         alert ('deleted succesfully')
      } catch (error) {
       console.error(error)
       alert ('deletion unsuccesfully')
       
      }
     }


     if (loading) return <CircularProgress  sx={{
          margin : '15% 50%', color:'red'
       }}  />
  
  return (

    

    <div className='info'>
       <div className="in">
                        <h3><FaHeart color='#9c690a' size={23} style={{marginRight:'20px'}}/>Saved Items</h3>
        </div>


       
       <div className="logout">
                        <button
                          onClick={() => window.history.back()}>
                        Back
                        </button>
        </div>

        <div className="revievw">
                <h1>Saved Store</h1>
                <p>Revist your saved items</p>
              </div>
      
      <hr style={{marginBottom:'20px'}} />

     <div className="saved">
        <div className="product-card">
            {favorites.map((fav) => (
     <div className="gal-card" key={fav._id}>
      <img   src={fav.product?.imageUrl}alt=""/>

      <h4 className="vin-h3">
            
            </h4>
          

          <h2 className='shop-name'>
            {fav.product?.name}
          </h2>

             <h2 className='price'>₦{fav.product?.price}</h2>

             

      <button onClick={() =>  deleteFav(fav._id)} className="btn-fave">
         <FiTrash2  size={20} color='red' className="cartt-icon" />
        </button>

        
     </div>

     

     
     ))} 
        </div>

        
        </div>
    </div>
  )
}

export default Saved
