import React, { useState} from 'react'
import {
 
  CircularProgress,

} from "@mui/material";
import './Add-pro.css'
import {FiBox,FiFileText, FiDollarSign, FiTag, FiHash, FiStar, FiLayers} from "react-icons/fi"
import axios from "axios";

const Form = ({ imageUrl }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    section:"",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProduct = async (e) => {
    e.preventDefault();

    console.log("IMAGE URL IN FORM:", imageUrl); 

    if (!imageUrl) {
      alert("Upload image first");
      return;
    }

    const payload = {
      ...formData,
      imageUrl,
    };

    try {
      await axios.post("http://localhost:3000/api/product", payload);
      alert("Product created ");
    } catch (err) {
      setError("Failed to create product");
    }
  };

  
  return (
    <div className='add-pro'>
        <h2>
           Add Product Details
        </h2>

       <div className="contact-us">
         
           <div className="di">
              <form action="" className='formm' onSubmit={handleProduct}>

                <div className="input-wrapperu">
                     <FiBox size={17} color='red' style={{marginTop:'15px', marginRight:'10px'}} className='input-icon'/>
                     <input type="text" name='name'   placeholder='Product Name' required    value={formData.name}
                     onChange={handleChange}/> 
                </div>

                <div className="input-wrapperu">
                     <FiDollarSign size={17} color='red' style={{marginTop:'15px', marginRight:'10px'}} className='input-icon'/>
                       <input type="text" name='price'   placeholder='Product Price' required  value={formData.price}
                      onChange={handleChange} /> 
                </div>

                <div className="input-wrapperu">
                     <FiTag size={17} color='red' style={{marginTop:'10px', marginRight:'10px'}} className='input-icon'/>
                     <input type="text" name='stock'   placeholder='Product Stock' required value={formData.stock}
                     onChange={handleChange}  /> 
                </div>

                <div className="input-wrapperu">
                     <FiLayers size={17} color='red' style={{marginTop:'15px', marginRight:'10px'}} className='input-icon'/>
                     <select name="section" id="" value={formData.section} onChange={handleChange} required>
                      <option value="">Select Section</option>
                      <option value="Cake">Cakes</option>
                      <option value="Pastries">Pastries</option>
                      <option value="Small-chop">Small-chop</option>
                      <option value="Snack">Snack</option>
                      
                      </select>  
                </div>
                
                
                
                <button type='submit' className='cardd-button'>
                  {loading ? (
                             <CircularProgress size={24} sx={{ color: "#fff" }} />
                           ) : (
                             "Create product"
                           )}
                </button>




              </form>
           </div>
        </div>
    </div>
  )
}

export default Form
