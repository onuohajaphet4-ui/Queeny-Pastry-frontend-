// import { Children } from 'react'
import {Navigate} from 'react-router-dom'

const Admin = ({children}) =>{
    const token = localStorage.getItem("token")
    const user =  JSON.parse(localStorage.getItem("user"))

    if (!token){
        return <Navigate to="/log" />
    }

    if (user?.role !== "admin") {
        return <Navigate to="/unauthorized" />
    }

    return children
}

export default Admin