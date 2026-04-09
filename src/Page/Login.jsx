import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import  video from '../assets/video-perfume.mp4'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import {FcGoogle} from "react-icons/fc"


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://queeny-pastry.onrender.com/api/user/login",
        formData
      );

      const {token,user} = res.data
      localStorage.setItem("token",token);
        localStorage.setItem('user', JSON.stringify(user))
        

        
     
        if (user.role === "admin"){
          navigate("/admin")
        }else
        {
          navigate("/customer")
        }
         console.log(user)
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      
       
       <motion.div
               initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
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
        sx={{
          position: "relative",
          zIndex: 1,
          width: "330px",
          p: 4,
          color: "#fff",
          background: "white",
            backdropFilter: "blur(10px)",
            borderRadius:'10px',
           boxShadow:'1px 2px 6px rgba(19, 18, 18, 0.69)'
        }}
      >
      
       

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, color:'black' }}>
          Log in <span style={{ color: "#9c690a" }}>.</span>
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 ,  color:'black'}}>
          Don't have an account?{" "}
          <span
            style={{ color: "#9c690a", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register 
          </span>

          
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={2}>
          {/* Email */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "#9c690a" }} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />
          <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined sx={{ color: "#9c690a" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff sx={{ color: "#9c690a" }} /> : <Visibility sx={{ color: "#9c690a" }} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldStyle}
                    />

           <Typography variant="body2" sx={{ mb: 3,  color:'black' }}>
          Forgotten password?{" "}
          <span
            style={{ color: "#9c690a", cursor: "pointer" }}
            onClick={() => navigate("/forgot")}
          >
            Reset Password
          </span>
        </Typography>
            
         
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
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
              "Login"
            )}
          </Button>
        </Stack>


        <p style={{textAlign:'center', paddingTop:'10px'}}>OR</p>

        <Button onClick={() =>{
          window.location.href="https://yati-perfume-backend.onrender.com/auth/google"
        }}
         sx={{
            py: 1.5,
            mt: 1,
            width:270,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#9c690a" },
          }}>
          <FcGoogle style={{paddingRight:'20px'}}/> with Google 
        </Button>


       
      </Box>

       </motion.div>
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

export default Login;