
import { FaArrowLeft, FaShoppingBag, FaShoppingBasket, FaUser, FaWhatsapp } from 'react-icons/fa'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiTrash2 } from "react-icons/fi";
import './Cart.css'

const Smallcart = () => {
  const [cart, setCart] = useState([]); // MUST be array
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Format price (₦1,200.00)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  // Fetch cart
    useEffect(() => {
    const fetchCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []
        setCart(storedCart)
        console.log(storedCart)
      } catch (error) {
        console.error("Error loading cart:", error)
        setCart([])
      } finally {
        setLoading(false)
      }
    }
  
    fetchCart()
  }, [])
  
    const deleteCart = (_id) => {
    const confirm = window.confirm("Are you sure you want to remove this product?")
    if (!confirm) return
  
    const updatedCart = cart.filter(item => item._id !== _id)
  
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
  
  
    // Calculate total
   const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  
   const changeQty = (id, type) => {
    const updatedCart = cart.map(item => {
      if (item._id !== id) return item
  
      let newQty =
        type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1)
  
      return { ...item, quantity: newQty }
    })
  
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
  
  if (loading) {
    return <h2>Loading cart...</h2>;
  }
  return (
    <div className='info'>
      <div className="in">
                       <h3><FaShoppingBag color='#9c690a' size={23} style={{marginRight:'20px'}}/>Food Basket</h3>
            </div>


            {/* Empty state */}
{cart.length === 0 ? (
  <div className="emptyy">
            <FaShoppingBasket size={70} className="icon"/>
  
            <h3>
              Your food basket is empty
            </h3>
  
            <p>Looks like you haven't added anything to your food basket yet</p>
  
  
            <Link to='/product' style={{textDecoration:'none'}}><button><FaArrowLeft/>Browse Menu</button></Link>
          </div>
) : (
  <div className="small-cart">
    {/* Cart Items */}
    {cart.map((item) => (
      <div key={item._id} className="cart-item">
        
       
        <div className="div">
          
            <img src={item.imageUrl} alt="" />
            <h4>{item.name}</h4>
           

         
        </div>

        <div className="p">

            <p>Quantity</p>
          
          
            <div className="divvv">
              <button onClick={() => changeQty(item._id, "dec")}>-</button>

              <span style={{ fontSize: "15px" }}>
                {item.quantity}
              </span>

              <button onClick={() => changeQty(item._id, "inc")}>+</button>
            </div>

            <h4>
            {formatPrice(item.price * item.quantity)}
          </h4>

          
        </div>
         <FiTrash2
            onClick={() => deleteCart(item._id)}
            size={20}
            color="red"
             style={{marginLeft:'90%',marginBottom:'2%'}}
          />
      </div>

      
    ))}
    <div className="sub">
        <div className="div">
            <h4>SubTotal</h4>
            <h4> {formatPrice(totalAmount)}</h4>
        </div>
        <button onClick={() => navigate("/form")}>Check Out</button>

        <div className="or">
                    or
        </div>
        
                   <button>
                    <a href="https://wa.me/2347074293026" style={{color:'inherit', textDecoration:'none'}}> <FaWhatsapp color="green" size={15}/> Order Via WhatsApp </a>
                   </button>
    </div>

  </div>

  
)}
   
    </div>
  )
}

export default Smallcart
