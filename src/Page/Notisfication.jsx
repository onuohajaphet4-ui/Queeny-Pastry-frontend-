import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notification.css";
import { FaBell } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import {
  CircularProgress,
} from "@mui/material";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading , setLoading] = useState(true)

 const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const res = await axios.get(
          "https://queeny-pastry.onrender.com/api/notisfication",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setNotifications(res.data);
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }finally {
      setLoading(false);
    }
    };
  
    useEffect(() => {
      fetchNotifications();
    }, []);

    

   if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
        <CircularProgress color="error" />
      </div>
    );
  }
  

  return (
    <div className="info">
                    <div className="in">
                                            <h3><FaBell color='#9c690a' size={23} style={{marginRight:'20px'}}/>Notifications </h3>
                </div>
    <div className="notification-page">

      <div className="logout">
         <button
           onClick={() => window.history.back()}>
         Back
         </button>
      </div>

     
      

      {notifications.length === 0 ? (
        <p className="empty">No notifications yet</p>
      ) : (
        <div className="notification-list">
          {notifications.map((item) => (
            <div className="notification-card" key={item._id}>
              <p>{item.message}</p>
              <span>
                {new Date(item.createdAt).toLocaleString()}
              </span>

              
            </div>
          ))}
        </div>
      )}
    </div>
    
    </div>
  );
};

export default Notification;