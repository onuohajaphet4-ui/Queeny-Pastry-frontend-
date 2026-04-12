import React, { useEffect, useState } from 'react'
import { FiShoppingBag, FiLogOut, FiShoppingCart, FiUser,FiUsers } from 'react-icons/fi'
import { FaArrowRight, FaBell,FaLock,FaUser} from 'react-icons/fa'
import './Resnav.css'
import {
  Avatar,
} from "@mui/material";
import {Link,useNavigate} from 'react-router-dom'
import Quickstat from './Dashboard'
import {
  CircularProgress,
} from "@mui/material";

const Resnav = () => {
    const [user , setUser] = useState(null)
    const [stats, setStats] = useState({})
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate();
        

        useEffect(() => {
          const savedUser  = 
          localStorage.getItem('user')
          if (savedUser){
            setUser(JSON.parse(savedUser))
          }setLoading(false)
        }, [])

 const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setLoading(false)
  navigate("/")
}


        
  return (
    <div className='resnav'>
        <div className="in">
           <h3><FaUser color='#9c690a' size={23}/> Myself</h3>
        </div>

        <div className="hello">
            <Avatar sx={{ bgcolor: "#9c690a" ,fontWeight:'bold'}}>
                 A
            </Avatar>

            <div>
                 <h4>Hello,</h4>
                 <span>Admin</span>
            </div>
        </div>

        <Quickstat stats={stats}/>

        <div className="card">


            <div className='card-flex'>
                <div>
                    <FiShoppingCart size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                <h4> Orders</h4>
                </div>
                <Link to='/order' style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
            </div>

            <div className='card-flex'>
                <div>
                    <FiShoppingBag size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                <h4>Shop</h4>
                </div>
                <Link to='/shop' style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
            </div>

            <div className='card-flex'>
                <div>
                    <FiUsers size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                <h4>Users</h4>
                </div>
                <Link to='/users' style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
            </div>

            <div className='card-flex'>
                <div>
                    <FaBell size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                <h4>Notification</h4>
                </div>
                <Link to='/notification' style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
            </div>
        </div>

        <div className="info">
            <h5>MY SETTING</h5>

            <div className="card">
                <div className='card-flex'>
                 <div>
                    <FiUser size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                 <h4>My Information</h4>
                 </div>
                 <Link to={`/info/${user?.id}`} style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
                </div>

                <div className='card-flex'>
                <div>
                    <FaLock size={20} color="#9c690a" style={{marginRight:'20px'}}/>
                <h4>ChangePassword</h4>
                </div>
                <Link to='/forgot' style={{textDecoration:'none' , color:'inherit'}}><FaArrowRight size={13} color='rgb(51, 47, 47)'/></Link>
                 </div>


            </div>

            
        </div>

        <div>
            <button onClick={handleLogout}>
              {loading ? (
                                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                                          ) : ( <>
                                            <FiLogOut size={18} style={{marginLeft:'10px'}}/>Sign Out
                                            </>
                                          )}
            </button>
        </div>
      
    </div>
  )
}

export default Resnav
