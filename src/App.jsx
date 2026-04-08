
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Account from './Page/Account'
import Order from './Page/Order'
import Orderr from './Dashboard/Customer/Order'
import Product from './Page/Product'
import Admin from './Page/Admin'
import Customer from './Page/Customer'
import Protect from './Component/Adminprotect'
import Pro from './Component/Customerprotect'
import Success from './Component/Success'
import Register from './Page/Register'
import Log from './Page/Login'
import Forgot from './Page/Forget'
import Reset from './Page/Reset'
import Section from './Page/Section'
import Notis from './Page/Notisfication'
import Notification from './Dashboard/Admin/Notis'
import Cart from './Page/Cart'
import Rate from './Page/Rate'
import Pay from './Page/Payment'
import Payment from './Page/Payment-success'
import Shop from './Dashboard/Admin/Product'
import User from './Dashboard/Admin/User'
import Info from './Dashboard/Admin/Info'
import Edit from './Dashboard/Admin/Edit'
import Saved from './Dashboard/Customer/Saved'
import Update from './Dashboard/Admin/Editproduct'
import Form from './Page/Deliveryform'
function App() {

  return (
    < div className='app'>
      
      <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/account' element={<Account/>} />
               <Route path='/order' element={<Order/>} />
               <Route path='/orderr' element={<Orderr/>} />
               <Route path='/product' element={<Product/>} />
                <Route path='/cart' element = {<Cart/>} />
                <Route path='/rate/:id' element = {<Rate/>}/>
               <Route path='/register' element = {<Register/>}/>
               <Route path='/log' element = {<Log/>}/> 
               <Route path='/forgot' element = {<Forgot/>}/>
               <Route path='/form' element = {<Form/>}/> 
               <Route path='/reset-password/:token' element = {<Reset/>}/> 
               <Route path='/shop' element = {<Shop/>}/>
               <Route path='/pay' element = {<Pay/>}/>
               <Route path='/notis' element = {<Notis/>}/>
               <Route path='/notification' element = {<Notification/>}/>
               <Route path='/payment-success' element = {<Payment/>}/>
               <Route path='/products/edit/:id' element ={<Update/>}/> 
               <Route path='/users' element = {<User/>}/> 
               <Route path='/info/:id' element = {<Info/>}/> 
               <Route path='/info/edit/:id' element = {<Edit/>}/>
               <Route path='/saved' element = {<Saved/>}/>
               <Route path='/oauth-success' element = {<Success/>}/>
               <Route path='product/section/:section' element = {<Section/>}/> 
               <Route path='/admin' element = {<Protect> <Admin/> </Protect>}/>
               <Route path='/customer' element = {<Pro> <Customer/> </Pro>}/>

      </Routes>

      

        
    </div>
  )
}

export default App
