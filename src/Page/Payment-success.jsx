import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './Payment-success.css';
import { FiCheckCircle } from "react-icons/fi";
import {Link} from 'react-router-dom'

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reference = params.get("reference");

    const verify = async () => {
      try {
        const token = localStorage.getItem("token");

        // ✅ VERIFY PAYMENT
        const verifyRes = await axios.get(
          `https://queeny-pastry.onrender.com/api/payment/verify/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!verifyRes.data.success) {
          alert("Payment not verified ❌");
          return;
        }

        // ✅ CREATE ORDER
        const orderRes = await axios.post(
          "https://queeny-pastry.onrender.com/api/order/create",
          { reference },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (orderRes.status === 200 || orderRes.status === 201) {
          setSuccess(true);
          
        }

      } catch (error) {
        console.log(error.response?.data || error.message);
        
      }
    };

    if (reference) verify();
  }, []);

  // ✅ FETCH ORDERS
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("https://queeny-pastry.onrender.com/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(res.data.orders);
       const orders = res.data.orders;
    // ✅ Get latest order (last in array)
    const latestOrder = orders[orders.length - 1];
    setData(latestOrder); // now it's a single object, not array


      
      console.log(res.data.orders);

    } catch (error) {
      console.error(error?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      fetchOrder(); // ✅ only fetch after success
    }
  }, [success]);

  // ✅ UI
  return (
    <div>
      {success ? (
        <div className="success-container">
      
      {/* Top Icon */}
      <div className="icon-wrapper">
        <FiCheckCircle className="check-icon" />
      </div>

      <h1>Order Confirmed!</h1>
      <p>Your payment was successful. Your order is being processed.</p>

      {/* Order Card */}
      <div className="order-card">
        <h3>ORDER DETAILS</h3>

       {data?.items?.map((item) => (
  <div className="order-item" key={item._id}>
    <img src={item.productId?.imageUrl} alt="product" />

    <div>
      <h4>{item.productId?.name}</h4>
      <p>Quantity: {item.quantity}</p>
    </div>

    <span>₦{item.productId?.price}</span>
  </div>
))}
        <hr />

        <div className="total">
          <span>Total Amount Paid</span>
          <strong> ₦{data?.totalAmount}</strong>
        </div>
      </div>

      {/* Buttons */}
      <Link to='/orderr' style={{textDecoration:'none'}}><button className="primary-btn">View My Orders</button></Link>
      <Link to='/product' style={{textDecoration:'none'}}><button className="secondary-btn">Continue Shopping ←</button></Link>

    </div>
      ) : (
        <h1>Confirming your order...</h1>
      )}
    </div>
  );
}