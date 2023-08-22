import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';

function Dashboard() {
    document.title = "Dashboard"
    // const navigate = useNavigate();
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);

    const [Hackathons, setHackathons] = useState([])

    async function fetchhackathons(){
      const response = await fetch('/gethackathons')
      const data = response.json()
      if (data.status){
        setHackathons(data.hackathons)
        setIsLoading(false)
      } 
    }
    useEffect(()=>{
      if (IsLoggedIn === true){
        fetchhackathons()
      }
    },[IsLoggedIn])

  return (
    <> 
            <div>
              <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              <hr />
                <div className='text-center font-bold text-3xl'>Dashboard</div>
                {Hackathons}
                {IsLoading &&
                <>
                Loading...
                </> }
            </div>
    </>
  )
}

export default Dashboard