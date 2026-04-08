import React , { useEffect , useState } from 'react'
import './Quickstat.css'
import { FiActivity, FiArrowUp, FiDollarSign, FiTrendingDown, FiTrendingUp, FiUsers, } from 'react-icons/fi'

const Quickstat = ({stats = {}}) => {
  
  

  return (
    <div>
      <div className="statss">
        <div className="stat-flex">
          <h2>Quick Stats</h2> 
          
          <FiActivity color='blue' size={30} style={{marginRight:'10px'}}/>

        </div>
        
        
        <div className='bbbnm'>
          
        

         <div className="statss-flex">
          <h4 > <FiUsers color='purple' size={20} style={{marginRight:'10px'}}/>     Total Users</h4>
          <h2> {stats.totalUsers || 0}  </h2>
         </div>

         <hr />

         <div className="statss-flex">
            <h4> <FiDollarSign color='green' size={20} style={{marginRight:'10px'}}/>Average Order</h4>
            <h2>
            ${(stats.AOV || 0).toFixed(2)}  
           </h2>
          </div>

          <hr />

          <div className="statss-flex">
            <h4>
              <FiTrendingUp color='orange' size={20} style={{marginRight:'10px'}}/> Top Product
            </h4>

            <h2>{stats.topProductName || "N/A"} </h2>
          </div> 

          <hr />
        </div>
      </div>
    </div>
  )
}

export default Quickstat
