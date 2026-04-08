import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useParams, useSearchParams } from "react-router-dom"
import { FaUser } from 'react-icons/fa'

const UpdateUser = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [phoneNumber, setPhoneNumber] = useState ('')
  const [loading, setLoading] = useState (false)
  const [error, setError] = useState(false)
  const [searchParams] = useSearchParams();

 const field = searchParams.get("field");

  const payload = {name,
    email,
    phoneNumber
    }

  const handleUpdate =async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
       const res = await 
       axios.put(`http://localhost:3000/api/user/update/${id}`,payload)
       console.log(res.data.users)
       setLoading(false)
       alert ('Profile Updated succesfully')
    } catch (error) {
      console.error (error?.response?.data?.message || "Request failed")
      alert ('Edit failed')
      setLoading(false) 
      
    }
  }
  return (

    <div className="info">

        <div className="in">
                         <h3><FaUser color='#9c690a' size={23} style={{marginRight:'20px'}}/>Admin Information</h3>
                </div>
        
                <div className="logout">
                         <button
                           onClick={() => window.history.back()}>
                         Back
                         </button>
                </div>
        
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
        
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Edit Profile
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Message goes here
        </Alert>

        <form onSubmit={handleUpdate}>
        
        
          <TextField
            label="name"
            name="name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName (e.target.value)}
            sx={textFieldStyle}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
             value={email}
            onChange={(e) => setEmail (e.target.value)}
            sx={textFieldStyle}
          />
          
            
            <TextField 
            label="Phone Number" 
            name="phoneNumber" 
            fullWidth 
            margin="normal"
             value={phoneNumber}
            onChange={(e) => setPhoneNumber (e.target.value)} 
            sx={textFieldStyle}
            />
            

          <Button
            type="submit"
            variant="contained"
            
            fullWidth
            sx={{ mt: 2, backgroundColor:'red' }}
          >
            {loading ? <CircularProgress/> : 'Update'}
          </Button>

          <Button variant="outlined" fullWidth sx={{ mt: 1 }}
          onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
    </div>
  );
};

const textFieldStyle = {
 "& .MuiOutlinedInput-root": {
    height: "55px",             
    backgroundColor: "rgba(90, 47, 47, 0.08)", 
    borderRadius: "12px",
    "& fieldset": { borderColor: "grey" },
    "&:hover fieldset": { borderColor: "#d18f13" },
    "&.Mui-focused fieldset": { borderColor: "#d18f13" },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
    padding: "0 14px",           
    height: "100%",              
  },
  "& .MuiInputLabel-root": { color: "black" },
};


export default UpdateUser;