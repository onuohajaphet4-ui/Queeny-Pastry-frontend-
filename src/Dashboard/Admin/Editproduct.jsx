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
import { useNavigate , useParams } from "react-router-dom";
import axios from 'axios'

const UpdateUser = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState ('')
  const [price, setPrice] = useState ('')
  const [stock, setStock] = useState ('')

  const [section, setSection] = useState ('')
  const [loading, setLoading] = useState (false)
  const [error, setError] = useState(false)

  const payload = {name,
    price,
    stock,
    section}

  const handleUpdate =async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
       const res = await 
       axios.put(`https://queeny-pastry.onrender.com/api/product/update/${id}`,payload)
       console.log(res.data.products)
       setLoading(false)
       alert ('Edit  succesfully')
    } catch (error) {
      console.error(error)
      console.error (error?.response?.data?.message || "Request failed")
      alert ('Edit failed')
      setLoading(false) 
      
    }
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          Edit Product
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
            label="Price"
            name="price"
            fullWidth
            margin="normal"
             value={price}
            onChange={(e) => setPrice (e.target.value)}
            sx={textFieldStyle}
          />
          
            <TextField 
            label="stock" 
            name="stock" 
            fullWidth 
            margin="normal"
             value={stock}
            onChange={(e) => setStock (e.target.value)} 
            sx={textFieldStyle}
            />
            
            
            <TextField 
            label="section" 
            name="section" 
            fullWidth 
            margin="normal"
             value={section}
            onChange={(e) => setSection (e.target.value)}
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