import React, {useState} from 'react'
import './Shop-nav.css'
import {FiAlignLeft,FiX} from "react-icons/fi"
import {Link} from 'react-router-dom'

function Shopnav() {
     const[open , setOpen] = useState(false)
  return (
    <div>
       <nav className='shopnav'>
         <ul>
          <Link to="/product" style={{textDecoration:'none'}}>  <li>All</li> </Link>
          <Link to="/product/section/Cake" style={{textDecoration:'none'}}>  <li>Cake</li> </Link>
          <Link to="/product/section/Snack" style={{textDecoration:'none'}}> <li>Snack</li> </Link> 
          <Link to="/product/section/Pastries" style={{textDecoration:'none'}}>  <li>Pastries</li> </Link> 
          <Link to="/product/section/Small-chop" style={{textDecoration:'none'}}>  <li>Small-chop</li> </Link>  
         </ul>
       </nav>


       
     <div className="sm">
        {/* mobile ham */}
        <div  className="menbu" onClick={() => setOpen(!open)}>
          { open ? <FiX size={28} color=' #9c690a'/> : <FiAlignLeft size={28} color=' #9c690a' /> }
        </div>
       
       
       
        <div className={`mobile-nabv ${open ? "show" : ""}`} >
       
                <ul className='non-ul' >
                   
                  <Link to="/product" style={{textDecoration:'none'}}>  <li className='non-li'>All</li> </Link>
          <Link to="/product/section/Cake" style={{textDecoration:'none'}}>  <li className='non-li'>Cake</li> </Link>
          <Link to="/product/section/Snack" style={{textDecoration:'none'}}> <li className='non-li'>Snack</li> </Link> 
          <Link to="/product/section/Pastries" style={{textDecoration:'none'}}>  <li className='non-li'>Pastries</li> </Link> 
          <Link to="/product/section/Small-chop" style={{textDecoration:'none'}}>  <li className='non-li'>Small-chop</li> </Link>  
                </ul>
       
       
                  
             
        </div>

        </div>

      
    </div>
  )
}

export default Shopnav
