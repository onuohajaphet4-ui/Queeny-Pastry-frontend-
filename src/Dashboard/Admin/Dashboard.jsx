import React , { useEffect , useState } from 'react'
import { FiActivity, FiArrowUp, FiDollarSign, FiTrendingDown, FiTrendingUp, FiUsers, } from 'react-icons/fi'

const Quickstat = () => {
  const [period, setPeriod] = useState('all')
   const [stats, setStats] = useState({})

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`https://queeny-pastry.onrender.com/api/dash?period=${period}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStats();
}, [period]);
  

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
            <h4> <FiDollarSign color='green' size={20} style={{marginRight:'10px'}}/>Total Revenue</h4>
            <h2>
            ₦{(stats.totalRevenue || 0).toLocaleString()} 
           </h2>
          </div>

          <hr />

          <div className="statss-flex">
            <h4>
              <FiTrendingUp color='orange' size={20} style={{marginRight:'10px'}}/>Total Product Sold
            </h4>

            <h2>{stats.totalProductsSold || 0}</h2>
          </div> 

          <hr />
        </div>
      </div>
    </div>
  )
}

export default Quickstat
