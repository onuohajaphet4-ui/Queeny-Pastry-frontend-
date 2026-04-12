
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {motion} from 'framer-motion'


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const{token} = useParams()

  const handleChange = (e) =>

    
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `https://queeny-pastry.onrender.com/api/user/reset-password/${token}`,
        formData
      );

       alert("Password has been succesfully resetted");
      navigate("/log");

      
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
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
                              transition={{ duration: 1.2, ease: "easeOut" }}
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
        
       

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 , color:'black'}}>
         Change Password <span style={{ color: "#9c690a" }}>.</span>
        </Typography>


        {error && (
          <Typography color="error" sx={{ mb: 2, color:'black' }}>
            {error}
          </Typography>
        )}

        <Stack spacing={2}>
          <TextField
                                label="Enter password"
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
              "Submit"
            )}
          </Button>
        </Stack>


       

       
       
      </Box>

       </motion.div>
    </Box>
  );
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    height: "55px",
    backgroundColor: "rgba(105, 99, 99, 0.3)",
    borderRadius: "12px",
    "& fieldset": { borderColor: "rgba(105, 99, 99, 0.3)" },
    "&:hover fieldset": { borderColor: "#9c690a" },
    "&.Mui-focused fieldset": { borderColor: "#9c690a" },
  },
  "& .MuiInputBase-input": {
    color: "black",
    padding: "0 14px",
    height: "100%",
  },
  "& .MuiInputLabel-root": {
    color: 'black',
  },
};

export default Login;