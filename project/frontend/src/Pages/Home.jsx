import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const [IsLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if (IsLoggedIn === true){
      navigate('/dashboard')
    } else {
      setIsLoading(false)
    }
  },[IsLoggedIn,navigate])
       
  return (
    <div>
      {
        IsLoading ? 
        <div>
          Loading...
        </div> 
        : 
        <div className=''>
          <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </div>
      }
    </div>
  )
}

export default Home