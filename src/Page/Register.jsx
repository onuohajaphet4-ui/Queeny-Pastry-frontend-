import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import {FcGoogle} from "react-icons/fc"


const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "https://queeny-pastry.onrender.com/api/user",
        formData
      );
      alert("Registration successful!.");
      navigate("/log");
      console.log(res.data);
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor:'white',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "#bbafaf",
          zIndex: 0,
        },
      }}
    >

        
            
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#eeebeb",
                  zIndex: 0,
                }}
              />

      
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          position: "center",
          zIndex: 1,
          width: "360px",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding:'20px',
          gap: 2,
           background: "white",
            backdropFilter: "blur(10px)",
            borderRadius:'10px',
            boxShadow:'1px 2px 6px rgba(19, 18, 18, 0.69)'
            
        }}
      >

        
        
        <Typography
          variant="overline"
          sx={{ letterSpacing: 1, color: "rgba(212, 127, 127, 0.8)" }}
        >
       
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 ,  color: "black"}}>
          Create new account<span style={{ color: "#e69808" }}> .</span>
        </Typography>

        <Typography variant="body2" sx={{ mb: 2,color: "black" }}>
          Already has an account?{" "}
          <span
            style={{ color: "#9c690a", cursor: "pointer" }}
            onClick={() => navigate("/log")}
          >
            Log in
          </span>
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 , color: "black"}}>
            ⚠️ {error}
          </Typography>
        )}

        {/* Flex row 1: First name / Last name */}
        <Box sx={{ display: "flex", gap: 7 }}>
          <TextField
            label=" name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "#9c690a" }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
         
        </Box>

        {/* Flex row 2: Email / Phone */}
        <Box sx={{ display: "flex", gap: 7  }}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ color: "#9c690a" }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
          <TextField
            label="Phone number"
            name="phoneNumber"
            type="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneOutlinedIcon sx={{ color: "#9c690a" }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
        </Box>

        {/* Flex row 3: Password / Address */}
        <Box sx={{ display: "flex", gap: 7 }}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#9c690a" }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
        
        </Box>

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            py: 1.5,
            mt: 1,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#9c690a" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Create account"
          )}
        </Button>

            <p style={{textAlign:'center'}}>OR</p>


        <Button onClick={() =>{
                  window.location.href="https://classwork-backend-yhli.onrender.com/auth/google"
                  
                }}
                sx={{
            py: 1.5,
            mt: 1,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#9c690a" },
          }}>
                  <FcGoogle style={{paddingRight:'20px'}}/>  with Google 
                </Button>
        
      </Box>

      
    </Box>
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
    color: "black",
    padding: "0 14px",           
    height: "100%",              
  },
  "& .MuiInputLabel-root": { color: "black" },
};


export default RegistrationScreen;
