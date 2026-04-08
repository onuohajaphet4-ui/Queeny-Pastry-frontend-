import { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../../Component/Nav'
import { FaShoppingBag, FaShoppingBasket } from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  
  

     //Fetch all order
     const fetchOrder = async () => {
      
      const token = localStorage.getItem("token")
       
        try {
            setLoading(true)
            const res = await  axios.get("http://localhost:3000/api/order/customer",{
               headers: {
              "Authorization": `Bearer ${token}`
             }
            }
              
            )
            setOrders(res.data.orders || []);
            console.log(res.data.orders)
            console.log(localStorage.getItem("token"));
            
            console.log("DATA:", res.data.orders);
         
        } catch (error) {
           console.error (error?.response?.data?.message || "Request failed")
        }finally{
            setLoading(false)
        }
    }



    useEffect(() => {
        fetchOrder ()
     

    }, [])

  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:3000/api/order/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    // ✅ Update UI instantly
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
        
              
              
              <div className="revievw">
                <h1>Your Order</h1>
                <p>Check out your order history</p>
              </div>
      
      <hr style={{marginBottom:'20px'}} />
    

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

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 ? (
        <div className="empty">
                  <FaShoppingBasket size={70} className="icon"/>
        
                  <h3>
                    No Order Yet
                  </h3>
        
                  <p>Looks like you haven't ordered anything yet</p>
        
        
                  <Link to='/product' style={{textDecoration:'none'}}><button><FaArrowLeft/>Browse Menu</button></Link>
                </div>
      ) : (
        filteredOrders.map((order) => (
          <div key={order._id} className="order-card">
            {/* HEADER */}
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

            
          </div>
        ))
      )}
    </div>
    </div>
  );
}