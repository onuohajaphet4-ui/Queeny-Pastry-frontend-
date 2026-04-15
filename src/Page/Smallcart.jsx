
import { FaArrowLeft, FaShoppingBag, FaShoppingBasket, FaUser, FaWhatsapp } from 'react-icons/fa'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiTrash2 } from "react-icons/fi";
import './Cart.css'

const Smallcart = () => {
  const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const navigate = useNavigate();
  
    
    // FORMAT PRICE
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price);
    };
  
    
    // LOAD CART FROM LOCAL STORAGE
    
    useEffect(() => {
      const fetchCart = () => {
        try {
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCart(storedCart);
        } catch (error) {
          console.error("Error loading cart:", error);
          setCart([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCart();
    }, []);
  
    
   //Delete
    const deleteCart = (_id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this product?"
      );
  
      if (!confirmDelete) return;
  
      const updatedCart = cart.filter((item) => item._id !== _id);
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    
    // CHANGE QUANTITY
  
    const changeQty = (id, type) => {
      const updatedCart = cart.map((item) => {
        if (item._id !== id) return item;
  
        let newQty =
          type === "inc"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
  
        return { ...item, quantity: newQty };
      });
  
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    // ===============================
    // TOTAL
    // ===============================
    const totalAmount = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  
    
    const generateWhatsAppLink = () => {
      const phone = "2347074293026";
  
      let message = "Hello Quenndy Pastry , I'd like to place an order:\n\n";
  
      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${
          item.price * item.quantity
        }\n`;
      });
  
      message +=`\nSubtotal: ₦${totalAmount}\n`;
      message += `Delivery Fee: ₦0\n`;
      message += `Total: ₦${totalAmount}`;
  
      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      console.log(generateWhatsAppLink())
    };
  
    
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
        
                   
                                 <a
                                   href={generateWhatsAppLink()}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{ textDecoration: "none" }}
                                 >
                                   <button>
                                     <FaWhatsapp color="green" size={15} /> Order Via WhatsApp
                                   </button>
                                 </a>
                   
    </div>

  </div>

  
)}
   
    </div>
  )
}

export default Smallcart
