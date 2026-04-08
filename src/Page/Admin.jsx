import React , { useEffect , useState } from 'react'
import Navbar from '../Dashboard/Admin/Navbar'
import Nav from '../Component/Nav'
import './Admin.css'
import {FiShoppingBag, FiBox, FiUsers, FiDollarSign, FiShoppingCart} from "react-icons/fi"
import {Link} from 'react-router-dom'

import Quickstat from '../Component/Quickstat'
import { useNavigate } from "react-router-dom"

const Admin = () => {
  const [user , setUser] = useState(null)
  const [stats, setStats] = useState({})
  const navigate = useNavigate()
  const [period, setPeriod] = useState('all')

  useEffect(() => {
    const savedUser  = 
    localStorage.getItem('user')
    if (savedUser){
      setUser(JSON.parse(savedUser))
    }
  }, [])


useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/dash?period=${period}`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStats();
}, [period]);


return (
    <div >
      <Nav/>
    <div className="admin-layout" >

      
      

     
      <Navbar/>
        <div className="admin-content">

       <div className="admincontent-intro">
        <h1>
          Admin Management Dashboard
        </h1>
        <p>Manage and track all store activities</p>
       </div>

       
       

       <div className="filters">
  <button className={period === "today" ? "active-btn" : "filter-btn"} onClick={() => setPeriod("today")}>Today</button>
  <button className={period === "week" ? "active-btn" : "filter-btn"} onClick={() => setPeriod("week")}>This Week</button>
  <button className={period === "month" ? "active-btn" : "filter-btn"} onClick={() => setPeriod("month")}>This Month</button>
  <button className={period === "year" ? "active-btn" : "filter-btn"} onClick={() => setPeriod("year")}>This Year</button>
  <button className={period === "all" ? "active-btn" : "filter-btn"} onClick={() => setPeriod("all")}>All Time</button>
</div>

  <div>
        <h3 className='adm-h3'>Performance Overview</h3>
 </div>

       <div className="admincontent-second">
          <div className="admincontent-card">
            <FiBox size={25} color='blue' className='admin-icon'/>

            <h2>{(stats.totalOrders || 0).toLocaleString()}</h2>
            <h4>Total Order</h4>

          </div>
          <div className="admincontent-card">
            <FiDollarSign size={25} color='green' className='admin-icon'/>

            <h2>₦{(stats.totalRevenue || 0).toLocaleString()}</h2>
            <h4>Total Revenue</h4></div>

          <div className="admincontent-card">
            <FiUsers size={25} color='purple' className='admin-icon'/>

            <h2>{stats.totalCustomers || 0}</h2>
            <h4>Total  Customer</h4></div>
          <div className="admincontent-card">
            <FiShoppingBag size={25} color='red' className='admin-icon'/>

            <h2>{stats.totalProductsSold || 0}</h2>
            <h4>Total Product Sold</h4></div>
       </div>

        
       <Quickstat stats={stats}/>
      </div>

      

    
    
    </div>
    
    </div>
  )
}

export default Admin
