import React, { useEffect, useState } from 'react'
import AddHackathonForm from '../Components/AddHackathonForm'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
import IsLoadingPage from './IsLoadingPage'
import Poster from '../Components/Poster'

function HackathonModifier() {
  const navigator = useNavigate()
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const [IsAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    fetch('/api/checkjwt',{
      method :'GET',
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.role === "admin"){
        setIsAdmin(true)
        fetchHackathons()
      } else {
        alert("Permission Denied")
        navigator('/')
      }
    })
  },[navigator])

  if (IsAdmin === false){
    return (
      <div>
        <IsLoadingPage/>
      </div>
    )
  }

  function fetchHackathons(){
    console.log("You are admin")
  }

  return (
    <div className=' '>
      <div className='sticky top-0'>
        <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
       <div className='md:flex'>
        <div className='lg:w-[35%] sm:w-[90%]   '>
          <AddHackathonForm/>
        </div>
        <div>
          <Poster/>
        </div>
       </div>
    </div>
  )
}

export default HackathonModifier