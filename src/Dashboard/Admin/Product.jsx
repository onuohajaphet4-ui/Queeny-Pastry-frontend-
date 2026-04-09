import React , { useEffect , useState } from 'react'
import './Product.css'
import {FiShoppingCart} from "react-icons/fi"
import Upload from '../../Component/Image'
import Form from '../../Component/Add-pro'
import {Link} from 'react-router-dom'
import { FaBell,FaSearch,FaShoppingCart, FaStore  } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import {
  CircularProgress,
} from "@mui/material";
import Shopnav from '../../Component/Shop-nav'


const Product = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState([])
  const [loading , setLoading] = useState(true)
      const { id } = useParams();
      const [message, setMessage] = useState("")
      const [addedId, setAddedId] = useState([])
      const navigate = useNavigate()
      const [search, setSearch] = useState("");
  
      useEffect(() => {
        axios.get("http://localhost:3000/api/product")
        .then((res) => {
          setData(res.data.products)
           setLoading(false)
  
        }).catch((error) => {
           console.error (error?.response?.data?.message || "Request failed")
        })
      }, [])
  
    

    //delete user 
    const deleteUser = async (_id) =>{

           const confirm = window.confirm('Are you sure want to delete this user?')
   if (!confirm) return;
   
   try {
      await axios.delete (`http://localhost:3000/api/product/delete/${_id}`)
  
      console.log(data)
      alert ('deleted succesfully')
   } catch (error) {
    console.error(error)
    alert ('deletoin unsuccesfully')
    
   }
    }

    const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

   const filteredCards = data.filter((b) =>
    b.name.toLowerCase().includes(search)
  );

    if (loading) return <CircularProgress  sx={{
             margin : '15% 50%', color:'red'
        }}  />
   
  return (

    <div className="info">
            <div className="in">
                                    <h3><FaStore color='#9c690a' size={23} style={{marginRight:'20px'}}/>Admin shop section</h3>
                    </div>
    <div className='admin-product'>

      <div className="logout">
         <button
           onClick={() => window.history.back()}>
         Back
         </button>
      </div>

      <hr />

      

      <div className="pro-intro">
        <h1>
         Add New Product
        </h1>

        <p>
          Add a new product to your shop inventory
        </p>

      </div>

      <div className="pro-add">
        <Upload setImageUrl={setImageUrl}/>
        <Form imageUrl={imageUrl}/>
      </div>

      <hr style={{padding:'1px', backgroundColor:'grey', margin:'6%'}}/>


      <h2 style={{textAlign:"center", marginBottom:'20px'}}>All</h2>
      
            <div className="input-wrapperr">
                                     <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='admin-input-iccon'/>
                                     <input
                                     onChange={handleSearch}
                                   className="admin-bran-input"
                                   type="text"
                                   placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                                 />
           </div>
      
                    <div className="input-wrapper">
                     <FaSearch  style={{marginTop:'px', color:'rgb(51, 47, 47)',marginRight:'10px'}}  className='admin-input-icoon'/>
                     <input
                   className="admin-bran-inputtt"
                   type="text"
                   placeholder="Search 'Cakes', 'pastries, 'small chops', 'snacks'........"
                   onChange={handleSearch}
                 />
                    </div>
      
      
            <div className='product-p'>
              {filteredCards.map((info) => (
              <div key ={info._id} className="product-card"> 
                
                <div>
                    <img src={info.imageUrl}  alt="" className='vin-im' />
                </div>
                  <h4 className="vin-h3">
                   {info.brand}
                  </h4>
                
      
                <h2 className='shop-name'>
                  {info.name}
                </h2>
      
                   <h2 className='price'>${info.price}</h2>
      
        
      
      

              <div className="shhsh">
                <button style={{backgroundColor:'green'}}   onClick={() => navigate(`/products/edit/${info._id}`)}>Edit</button>
                <button style={{backgroundColor:'red'}} onClick={() => deleteUser(info._id)}  >Delete</button>
              </div>

              
                  
              
              </div>
            ))}
             {filteredCards.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>No Product Found</p>
      )}
      
          </div>
      
    </div>
    </div>
  )
}

export default Product
