import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './Payment-success.css';
import { FiCheckCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
const [params] = useSearchParams();
const [success, setSuccess] = useState(false);
const [order, setOrder] = useState(null);

useEffect(() => {

const verifyAndCreateOrder = async () => {
  
const token = localStorage.getItem("token");
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference");

      if (!reference) return;

      const alreadyDone = localStorage.getItem("order_done");
      if (alreadyDone === reference) return;

  try {
    if (!reference) {
      alert("No payment reference");
      return;
    }

    const token = localStorage.getItem("token")
    //  VERIFY PAYMENT
    const verifyRes = await axios.get(
      `https://queeny-pastry.onrender.com/api/payment/verify/${reference}`,{
               headers: {
              "Authorization": `Bearer ${token}`
             }
            }
    );

    if (!verifyRes.data.success) {
      alert("Payment not verified ");
      return;
    }

    //  CREATE ORDER
    const orderRes = await axios.post(
      "https://queeny-pastry.onrender.com/api/order/create",
      { reference },{
               headers: {
              "Authorization": `Bearer ${token}`
             }
            }
    );

    if (orderRes.data.success) {
      setOrder(orderRes.data.order);
      setSuccess(true);

      //  CLEAR CART
      localStorage.removeItem("cart");
    }

  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Something went wrong");
  }

  

};

verifyAndCreateOrder();

}, []);


 const fetchOrder = async () => {
    try {
     const reference = params.get("reference");

      const res = await axios.get(`https://queeny-pastry.onrender.com/api/order/${reference}` );
    setOrder(res.data.order); 
      console.log(res.data.order);

    } catch (error) {
      console.error(error?.response?.data?.message || "Request failed");
    } 
  };

  useEffect(() => {
    if (success) {
      fetchOrder(); 
    }
  }, [success]);

return (
<div>
{success ? (
<div className="success-container">

      <div className="icon-wrapper">
        <FiCheckCircle className="check-icon" />
      </div>

      <h1>Order Confirmed!</h1>
      <p>Your payment was successful. Your order is being processed.</p>

      <div className="order-card">
        <h3>ORDER DETAILS</h3>

        {order?.items?.map((item) => (
          <div className="order-item" key={item._id}>
            <img src={item?.productId?.imageUrl} alt="" />

            <div>
              <h4>{item?.productId?.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>

            <span>₦{item.price}</span>
          </div>
        ))}

        <hr />

        <div className="total">
          <span>Total Amount Paid</span>
          <strong>₦{order?.totalAmount}</strong>
        </div>
      </div>

      <Link to='/orderr' style={{textDecoration:'none'}}>
        <button className="primary-btn">View My Orders</button>
      </Link>

      <Link to='/product' style={{textDecoration:'none'}}>
        <button className="secondary-btn">Continue Shopping ←</button>
      </Link>

    </div>
  ) : (
    <h1 style={{textAlign:'center'}}>Confirming your order...</h1>
  )}
</div>

);
}