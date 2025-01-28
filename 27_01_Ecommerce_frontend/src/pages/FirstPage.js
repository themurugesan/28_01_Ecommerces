import React from 'react'
import {  useNavigate } from 'react-router-dom'


const FirstPage = () => {
  
    let navigate=useNavigate()
    
  return (
   <>
   <button onClick={()=>{navigate("/admin")}} >Admin</button>
   <button onClick={()=>{navigate("/login")}}>User</button>



   </>
  )
}

export default FirstPage