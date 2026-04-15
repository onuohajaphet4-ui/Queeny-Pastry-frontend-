import { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import{Link} from 'react-router-dom'
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://queeny-pastry.onrender.com/api/order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data.orders || []);
        console.log(res.data.orders || [])
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (_id) =>{
  
      const confirm = window.confirm('Are you sure want to delete this order?')
     if (!confirm) return;
     
     try {
        await axios.delete (`https://queeny-pastry.onrender.com/api/order/delete/${_id}`)
        alert ('deleted succesfully')
     } catch (error) {
      console.error(error)
      alert ('deletion unsuccesfully')
      
     }
    }

  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `https://queeny-pastry.onrender.com/api/order/admin/status/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status } : order
      )
    );

  } catch (err) {
    console.log(err);
    alert("Failed to update status");
  }
};

  // FILTER LOGIC
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading orders...</h2>;
  }

  return (

    <div className="info">
            <div className="in">
                                    <h3><FaShoppingBag color='#9c690a' size={23} style={{marginRight:'20px'}}/>Ordered Items</h3>
                    </div>
        
        <div className="logout">
                        <button
                          onClick={() => window.history.back()}>
                        Back
                        </button>
        </div>

        <hr />
    
    <div className="orders-page">
      <div className="review">
                <h1>Admin Order block</h1>
                <p>Check out  orders history</p>
              </div>
      <h2>My Orders</h2>

      {/* FILTER BUTTONS */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "processing" ? "active" : ""}
          onClick={() => setFilter("processing")}
        >
          Processing
        </button>

        <button
          className={filter === "shipped" ? "active" : ""}
          onClick={() => setFilter("shipped")}
        >
          Shipped
        </button>

        <button
          className={filter === "delivered" ? "active" : ""}
          onClick={() => setFilter("delivered")}
        >
          Delivered
        </button>
      </div>

    
      {filteredOrders.length === 0 ? (
        <div className="empty">
          <FaShoppingBasket size={70} className="icon"/>

          <h3>
            No Order Yet
          </h3>

          


          </div>
      ) : (
        filteredOrders.map((order) => (
          <div key={order._id} className="order-card">
            
            <div className="order-header">
              <h4>Order #{order._id.slice(-6)}</h4>

              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <p className="date">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <hr />

            {/* ITEMS */}
            {order.items.map((item, index) => (
              <div key={index} className="item">
                <img
                  src={item.productId?.imageUrl}
                  alt=""
                />

                <div className="item-info">
                  <h5>{item.productId?.name}</h5>
                  <p>Qty: {item.quantity}</p>
                </div>

                <span>₦{item.price}</span>
              </div>
            ))}

            {/* TOTAL */}
            <div className="total">
              Total: ₦{order.totalAmount}
            </div>

            <div className="order-status">
  <button onClick={() => updateStatus(order._id, "processing")}>
    Processing
  </button>

  <button onClick={() => updateStatus(order._id, "shipped")}>
    Shipped
  </button>

  <button onClick={() => updateStatus(order._id, "delivered")}>
    Delivered
  </button>
</div>

<hr  style={{margin:'20px 5px'}}/>

      <div className="order-user">
        <div >
          <h4>Name:</h4>
          <p>{order.delivery?.name}</p>
        </div>

        <div>
          <h4> Email:</h4>
          <p>{order.email}</p>
        </div>

        <div>
          <h4>Phone:</h4>
           <p>{order.delivery?.phone}</p>
        </div>

        <div>
          <h4>Delivery Address :</h4>
          <p>{order.delivery?.address}</p>
        </div>
      </div>

       <hr />
        
        <button onClick={() =>  deleteOrder(order._id)} className="btn-order">
                 <FiTrash2  size={20} color='red' className="cartt-icon" />
                </button>
          </div>

          
        ))

       
      )}

      
    </div>
    </div>
  );
}