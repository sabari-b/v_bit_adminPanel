import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowDown,AiOutlineLogout } from 'react-icons/ai';

 const Logout = () => {
    const Navigate=useNavigate()
   

    const handleclose=()=>{
        localStorage.removeItem('token')
        Navigate('/')
      }
  return (
    <div>
        <button className='logout-button-dash' onClick={handleclose}>logout <AiOutlineLogout /></button>
    </div>
  )
}
export default Logout