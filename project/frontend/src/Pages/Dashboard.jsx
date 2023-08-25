import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import { BiSearchAlt2 } from 'react-icons/bi'
import HackathonPages from '../Components/HackathonPages';

function Dashboard() {
    document.title = "Dashboard"
    const navigate = useNavigate();
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [Search, setSearch] = useState('');
    const [Events, setEvents] = useState([])
    const [Filter, setFilter] = useState({
      department : "",
      mode : "",
      status : ""
    })
    const handlefilterchange = (e) => {
      setFilter({
        ...Filter,
        [e.target.name] : e.target.value
      });
    };

    async function fetchhackathons(){
      const response = await fetch('/gethackathons')
      const data = await response.json()
      if (data.status){
        setEvents(data.events)
        setIsLoading(false)
      } 
    }
    useEffect(()=>{
      if (IsLoggedIn === true){
        fetchhackathons()
      }
    },[IsLoggedIn])

    console.log(Filter.status)
    function applicationStatus(event){
      if (new Date(event.register_start_date) > new Date()) return "startingsoon";
      else if (new Date(event.register_start_date) < new Date() && new Date(event.register_end_date) > new Date()) return "registrationstart"
      else if (new Date(event.register_end_date) < new Date() && new Date(event.hackathon_date) > new Date()) return "registrationend"
      else if (new Date(event.hackathon_date) < new Date()) return "eventend"
    }
  return (
    <> 
            <div className='w-full'>
              <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              <hr />
                <div className='text-center font-bold text-3xl'>Dashboard</div>
                
                {IsLoading ?
                <div>
                Loading...
                </div> 
                :
                <div className='md:px-10 px-[7%] '>
                  <div className='flex md:justify-between mx-14 gap-3'>
                    <div className='md:flex hidden gap-4'>
                      <div className='border-[1px] border-black px-2'>
                        <p className='text-xl font-semibold'>Department</p>
                        <select className='outline-none w-full' name='department' onChange={handlefilterchange} defaultValue=''>
                          <option value="">ALL</option>
                          <option value="aids">AIDS</option>
                          <option value="ece">ECE</option>
                        </select>
                      </div>      
                      <div className='border-[1px] border-black px-2'>
                        <p className='text-xl font-semibold'>Mode</p>
                        <select className='outline-none w-full' name='mode' onChange={handlefilterchange} defaultValue="">
                          <option value="">ANY</option>
                          <option value="online">ONLINE</option>
                          <option value="offline">OFFLINE</option>
                        </select>
                      </div>
                      <div className='border-[1px] border-black px-2'>
                        <p className='text-xl font-semibold'>Status</p>
                        <select className='outline-none w-full' name="status" onChange={handlefilterchange} defaultValue="">
                          <option value="">ANY</option>
                          <option value="startingsoon">Starting Soon</option>
                          <option value="registrationstart">Registration Started</option>
                          <option value="registrationend">Registration End</option>
                          <option value="eventend">Event End</option>
                        </select>
                      </div>
                    </div>
                    <div className='flex items-center bg-green-100'>
                      <BiSearchAlt2 size={30} color='blue'/>
                      <input className='bg-green-100 pl-1 outline-none' type="text" value={Search} onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                  </div>
                  <div className='md:grid grid-cols-3 scroll-smooth w-full'>
                  {Events.map(event=>{
                     if( ((event.Organising_mode).toLowerCase()).includes(Filter.mode) && (((event.name).toLowerCase()).includes(Search) || ((event.organisation_name).toLowerCase()).includes(Search)) && ((Filter.status !== "") ? (applicationStatus(event) === Filter.status) : true) )  {
                       return (
                         <div key={event.event_id}>
                          <HackathonPages event={event} navigate={navigate} />
                        </div>
                     ) 
                     } return null;
                  }
                  )}  
                  </div>
                  
                </div>}
            </div>
    </>
  )
}

export default Dashboard