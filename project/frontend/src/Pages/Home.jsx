import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
import HackathonsPosters from '../PosterViews/HackathonsPosters'
import EventsPosters from '../PosterViews/EventsPosters'
import ConferencesPosters from '../PosterViews/ConferencesPosters'
function Home() {
  const navigate = useNavigate()
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  const [IsLoading, setIsLoading] = useState(true)

  const [EventPosters, setEventPosters] = useState([])
  const [HackathonPosters, setHackathonPosters] = useState([])
  const [ConferencePosters, setConferencePosters] = useState([])

  useEffect(()=>{
    if (IsLoggedIn === true){
      navigate('/dashboard')
    } else {
      setIsLoading(false)
    }
  },[IsLoggedIn,navigate])
  
  useEffect(()=>{
    try{
      fetch('/api/eventposter').then(resp => resp.json()).then(data =>{
        if(data.status){
          setEventPosters(data.event_posters)
          setHackathonPosters(data.hackathon_posters)
          setConferencePosters(data.conference_posters)
        }
      })
    } catch {
      alert("Backend Error")
    }
  },[])
  // console.log(EventPosters)
  return (
    <div className=''>
      {
        IsLoading ? 
        <div>
          Loading...
        </div> 
        : 
        <div className='sticky top-0'>
          <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        </div>
      }
      <div className='h-screen pt-20'> 
        <div className='h-96'>
          <HackathonsPosters posters={HackathonPosters}/>
          <p className='md:flex hidden justify-center pt-14 text-4xl font-bold'>HACKATHON</p>
        </div>
        <div className='h-96'>
          <EventsPosters posters={EventPosters}/>
          <p className='md:flex hidden justify-center pt-14 text-4xl font-bold'>EVENTS</p>
        </div>
        <div className='h-96'>
          <ConferencesPosters posters={ConferencePosters}/>
          <p className='md:flex hidden justify-center pt-14 text-4xl font-bold'>Conference</p>
        </div>
      </div>
    </div>
  )
}

export default Home