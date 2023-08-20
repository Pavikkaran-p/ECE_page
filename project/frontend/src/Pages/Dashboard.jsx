import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    document.title = "Dashboard"
    const navigate = useNavigate();
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
          .then(response => response.json())
          .then(data => {
            if (!data.status){
            //   window.location.href = '/'
            navigate('/')
            } else {
              setIsLoading(false)
            }
          })
        } else {
            window.location.href = "/"
        }
      })
  return (
    <> 
        {IsLoading ? 
            <div>Loading...</div>
            :
            <div>
                Dashboard
            </div>
        }
    </>
  )
}

export default Dashboard