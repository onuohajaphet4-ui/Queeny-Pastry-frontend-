import React , { useEffect , useState } from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'
import { FiHeart, FiLogOut, FiShoppingCart, FiUser } from 'react-icons/fi'
import { FaArrowRight, FaBell,FaLock,FaUser} from 'react-icons/fa'
import Mobile from './Resnav'
import { useNavigate } from "react-router-dom"


const Navv = () => {
  const [user , setUser] = useState(null)
  const navigate = useNavigate()
    
    useEffect(() => {
      const savedUser  = 
      localStorage.getItem('user')
      if (savedUser){
        setUser(JSON.parse(savedUser))
      }
    }, [])



     const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/")
}

  return (
    <div>
      <ul className='ull'>
       <div className="first">
        <h1>Customers Dashboard</h1>
         {user ? (
            <span >
              Hi,   <b>{user.names}  </b> 
            </span>
          ) : (
            <span style={{ color: "black", marginLeft: "20px" ,fontSize:'10px'}}>
              Welcome, Guest
            </span>
          )}
        </div>


        <hr  style={{background:'red',border:'red 1px solid', marginBottom:'20px'}}/>


         <Link to='/orderr' style={{textDecoration:'none' , color:'inherit'}}><li className='main-li'><FiShoppingCart size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>My Order</li></Link> 
         <Link to='/saved' style={{textDecoration:'none' , color:'inherit'}}><li className='main-li'><FiHeart size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>Saved Item</li></Link> 
         <Link to='/shopp' style={{textDecoration:'none' , color:'inherit'}}><li className='main-li'><FaBell size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>Notification</li></Link> 
         <Link to={`/info/${user?.id}`} style={{textDecoration:'none' , color:'inherit'}}><li className='main-li'><FiUser size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>My Information</li></Link>
         <Link to='/forgot' style={{textDecoration:'none' , color:'inherit'}}><li className='main-li'><FaLock size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>Change Password</li></Link>
         <button onClick={handleLogout}><FiLogOut size={20} color='white' style={{marginTop:'15px', marginRight:'10px'}}/>Sign Out</button>
        </ul>

        {/* Moblie */}

        <div className='mobile'>
            <Mobile/>
        </div>


        
                  
    </div>
  )
}

export default Navv
