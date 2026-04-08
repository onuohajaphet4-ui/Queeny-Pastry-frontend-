import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";

const CreateNotification = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      alert("Message is required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://queeny-pastry.onrender.com/api/notisfication",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Notification created");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Error creating notification");
    } finally {
      setLoading(false);
    }
  };


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
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchNotifications();
    }, []);

    
      
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
      
  return (
    <div className="info">
                <div className="in">
                                        <h3><FaBell color='#9c690a' size={23} style={{marginRight:'20px'}}/>Admin Notification </h3>
            </div>
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Create Notification</h2>

      <div className="logout">
         <button
           onClick={() => window.history.back()}>
         Back
         </button>
      </div>

      <hr />

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter notification message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "green",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Notification"}
        </button>
      </form>
    </div>
     
     <hr style={{ margin: "2%"}} />
    <div>
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

              <button onClick={() =>  deleteFav(item._id)} className="notis-icon">
                                     <FiTrash2  size={20} color='red' className="notis-icon" />
                                    </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default CreateNotification;