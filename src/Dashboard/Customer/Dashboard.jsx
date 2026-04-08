import React , { useEffect , useState } from 'react'
import { FiActivity, FiArrowUp, FiDollarSign, FiTrendingDown, FiTrendingUp, FiUsers, } from 'react-icons/fi'

const Quickstat = () => {
  const [period, setPeriod] = useState('all')
   const [stats, setStats] = useState({})

  useEffect(() => {
  const fetchStats = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch('https://queeny-pastry.onrender.com/api/dash/customer' ,{
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
      const data = await res.json();
      setStats(data);
      console.log(data)
       console.log(token)
      
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
          <h4 > <FiUsers color='purple' size={20} style={{marginRight:'10px'}}/>     Total Order</h4>
          <h2> {(stats.totalOrders || 0).toLocaleString()}  </h2>
         </div>

         <hr />

         <div className="statss-flex">
            <h4> <FiDollarSign color='green' size={20} style={{marginRight:'10px'}}/>Total Spent</h4>
            <h2>
            ₦{(stats.totalSpent|| 0).toLocaleString()} 
           </h2>
          </div>

          <hr />

          <div className="statss-flex">
            <h4>
              <FiTrendingUp color='orange' size={20} style={{marginRight:'10px'}}/>Product Bought
            </h4>

            <h2>{stats.totalProducts|| 0}</h2>
          </div> 

          <hr />
        </div>
      </div>
    </div>
  )
}

export default Quickstat
