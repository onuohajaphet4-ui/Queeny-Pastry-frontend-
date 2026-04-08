import React from 'react'
import cake from '../assets/cakee.jpg'
import chin from '../assets/hero-chin.jpg'
import meat from '../assets/hero-meat.jpg'
import small from '../assets/hero-small.jpg'
import {Link} from 'react-router-dom'

const Heroswip = () => {
  return (
    <div className='fff'>
        <Link to="/product/section/Cake" style={{textDecoration:'none',color:'inherit'}}>
        <div className="ff">
            <img src={cake} alt="" />
            <h4>Cakes</h4>
        </div>
        </Link>

        <Link to="/product/section/Snack" style={{textDecoration:'none',color:'inherit'}}><div className="ff">
            <img src={chin} alt="" />
            <h4>Snacks</h4>
        </div>
        </Link>

        <Link to="/product/section/Pastries" style={{textDecoration:'none',color:'inherit'}}><div className="ff">
            <img src={meat} alt="" />
            <h4>Pastries</h4>
        </div>
        </Link>

        <Link to="/product/section/Small-chop" style={{textDecoration:'none',color:'inherit'}}><div className="ff">
            <img src={small} alt="" />
            <h4>Chops</h4>
        </div>
        </Link>
      
    </div>
  )
}

export default Heroswip
