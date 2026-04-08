
import { FaArrowLeft, FaShoppingBag, FaShoppingBasket, FaUser } from 'react-icons/fa'
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
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("https://queeny-pastry.onrender.com/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Cart data:", res.data);

        // Ensure it's always an array
        setCart(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const deleteCart = async (_id) =>{
  
             const confirm = window.confirm('Are you sure want to remove this Product?')
     if (!confirm) return;
      const token = localStorage.getItem("token")
     try {
        await axios.delete (`https://queeny-pastry.onrender.com/api/cart/delete/${_id}`,
          {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
        )
        alert ('deleted succesfully')
     } catch (error) {
      console.error(error)
      alert ('deletion unsuccesfully')
      
     }
    }


  // Calculate total
  const totalAmount = Array.isArray(cart)
    ? cart.reduce((total, item) => {
        return (
          total +
          ((item.productId?.price || 0) * (item.quantity || 0))
        );
      }, 0)
    : 0;

  const changeQty = async (id, type) => {
   setCart(prevCart =>
    prevCart.map(item => {

      if (item._id !== id) return item;

      let newQty =
        type === "inc"
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      // 🔥 send to backend
      axios.put(`https://queeny-pastry.onrender.com/api/cart/${id}`,
         { quantity: newQty });

      // 🔥 update frontend immediately
      return { ...item, quantity: newQty };
    })
  );
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
          
            <img src={item.productId?.imageUrl} alt="" />
            <h4>{item.productId?.name}</h4>
            <FiTrash2
            onClick={() => deleteCart(item._id)}
            size={20}
            color="red"
            className="divvvv"
          />

         
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
            {formatPrice(item.productId?.price * item.quantity)}
          </h4>

          
        </div>
      </div>

      
    ))}
    <div className="sub">
        <div className="div">
            <h4>SubTotal</h4>
            <h4> {formatPrice(totalAmount)}</h4>
        </div>
        <button onClick={() => navigate("/form")}>Check Out</button>
    </div>

  </div>

  
)}
   
    </div>
  )
}

export default Smallcart
