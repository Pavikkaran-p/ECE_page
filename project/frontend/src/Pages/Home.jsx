import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  const [IsLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    const token = localStorage.getItem('Token')
    if(token != null){
      fetch('/checkjwt',{
        method: 'GET',
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          setIsLoading(false)
        }
        return response.json();
    })
      .then(data => {
        console.log("Some error")
        if (data.status){
          navigate('/dashboard')
        } else {
          setIsLoading(false)
        }
      })
    } else {
      setIsLoading(false)
    }
  },[navigate])
  return (
    <div>
      {
        IsLoading ? 
        <div>
          Loading...
        </div> 
        : 
        <div className=''>
          <Header/>
        </div>
      }
    </div>
  )
}

export default Home