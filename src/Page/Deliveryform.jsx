import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Deliveryform.css'
import Nav from '../Component/Nav'
import { FaFolder, FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";

export default function Delivery() {

  const navigate = useNavigate();
 const [form, setForm] = useState({ name: "", phone: "", address: "", email: "" });
const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };
const handleSubmit = (e) => { e.preventDefault();

if (!form.name || !form.phone || !form.address || !form.email) { alert("Please fill all fields"); return; }
 localStorage.setItem("deliveryInfo", JSON.stringify(form)); 
  navigate("/pay"); 
};
  return (

    <div className="info">
      <div className="ba">
      
      <div className="in">
                       <h3><FaAddressBook color='#9c690a' size={23} style={{marginRight:'20px'}}/>Delivery Form</h3>
            </div>
              
               <Nav/>
      </div>
      
      <div className="delivery-container">
       <div className="formmm" >
       <h2>Delivery Information</h2>
 
       <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
         <br /> <br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
        />
        <br /> <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <br /> <br />

        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          required
          onChange={handleChange}
        />

        <br /> <br />

        <button type="submit">Proceed to Payment</button>

      </form>
      </div>
    
    </div>

    
    </div>
  );
}