import React , {useState} from 'react'
import Nav from '../Component/Nav'
import './Rate.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Rate = () => {
    const [comment, setComment] = useState("");
    const [user, setUser] = useState("");
const [rating, setRating] = useState(5);

const {id} = useParams()

const submitReview = async () => {
  await axios.post(`https://yati-perfume-backend.onrender.com/api/product/review/${id}`, {
    user,
    rating,
    comment
  });

  alert('Review added Succesfully')


  window.location.reload(); // refresh reviews
};

  return (
    <div>
   
            <Nav/>
       

       
  <div className="reviw">
      

    <select onChange={(e) => setRating(e.target.value)}>
      <option value="5">5</option>
     <option value="4">4</option>
     <option value="3">3</option>
     <option value="2">2</option>
     <option value="1">1</option>
    </select>

    <button onClick={submitReview}>Submit</button>
   </div>

   
   
      
    </div>
  )
}

export default Rate
