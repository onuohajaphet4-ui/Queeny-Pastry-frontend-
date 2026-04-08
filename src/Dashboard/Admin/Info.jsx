import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from 'react-icons/fa'
import './Info.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FiMail, FiPhone, FiUser } from 'react-icons/fi';

const Info = () => {
     const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("User not found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
        // IMPORTANT: your backend sends { users }
        setUser(res.data.users);
        console.log(res.data.users);
        console.log(id)

      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);
  return (
    <div className='info'>
      <div className="in">
                 <h3><FaUser color='#9c690a' size={23} style={{marginRight:'20px'}}/>Admin Information</h3>
      </div>

      <div className="logout">
                 <button
                   onClick={() => window.history.back()}>
                 Back
                 </button>
     </div>

     
     
     
            
            
     
             <div className="revievw">
                     <h1>My information</h1>
                     <p>Edit and view personal information</p>
                   </div>
           
           <hr style={{marginBottom:'20px'}} />

        <div className="input">
            <div><FiUser size={15} color='#9c690a' style={{marginRight:'5px'}}/> {user?.name}</div>
            <div><FiPhone size={15} color='#9c690a' style={{marginRight:'5px'}}/> {user?.phoneNumber}</div>
            <div><FiMail size={15} color='#9c690a' style={{marginRight:'10px'}}/>{user?.email}</div>

            <button onClick={() => navigate(`/info/edit/${user._id}`)}>Edit</button>
        </div>
    </div>
  )
}

export default Info
