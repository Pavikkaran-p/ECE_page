import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import { BiSearchAlt2 } from 'react-icons/bi'
import HackathonPages from '../Components/HackathonPages';
import Footer from '../Components/Footer';

function Dashboard() {
    document.title = "Dashboard"
    const navigate = useNavigate();
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [Search, setSearch] = useState('');
    const [Events, setEvents] = useState([])
    const [FilterEvents, setFilterEvents] = useState([])
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

    function filtereventslist() {
      const filteredEvents = Events.filter((event) => {
        const isMatchingMode = event.Organising_mode.toLowerCase().includes(Filter.mode.toLowerCase());
        const isMatchingNameOrOrg = event.name.toLowerCase().includes(Search.toLowerCase()) || event.organisation_name.toLowerCase().includes(Search.toLowerCase());
        const isMatchingStatus = Filter.status !== "" ? applicationStatus(event) === Filter.status : true;
    
        return isMatchingMode && isMatchingNameOrOrg && isMatchingStatus;
      }); 
      setFilterEvents(filteredEvents);
    }

    useEffect(()=>{
      filtereventslist()
      setCurrentPage(1)
    },[Search, Filter])

    async function fetchhackathons(){
      const response = await fetch('/gethackathons',{
        method : 'GET',
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem('Token')}`
        }
      })
      const data = await response.json()
      if (data.status){
        setEvents(data.events)
        setFilterEvents(data.events)
        setIsLoading(false)
      } 
    }

    const [CurrentPage, setCurrentPage] = useState(1)
    const event_per_page = 9
    const lastIndex = CurrentPage * event_per_page
    const firstIndex = lastIndex - event_per_page
    const records = FilterEvents.slice(firstIndex, lastIndex)
    const length_of_events = FilterEvents.length
    const total_no_page = Math.ceil(length_of_events/event_per_page)
    const numberarray = [...Array(total_no_page+1).keys()].slice(1)

    useEffect(()=>{
      if (IsLoggedIn === true){
        fetchhackathons()
      }
    },[IsLoggedIn])

    function applicationStatus(event){
      if (new Date(event.register_start_date) > new Date()) return "startingsoon";
      else if (new Date(event.register_start_date) < new Date() && new Date(event.register_end_date) > new Date()) return "registrationstart"
      else if (new Date(event.register_end_date) < new Date() && new Date(event.hackathon_date) > new Date()) return "registrationend"
      else if (new Date(event.hackathon_date) < new Date()) return "eventend"
    }
  return (
    <> 
            <div className='w-full'>
              <div className='sticky top-0'>
                <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
              </div>
              <hr />
                <div className='text-center font-bold text-3xl'>Dashboard</div>
                
                {IsLoading ?
                <div>
                Loading...
                </div> 
                :
                <div className='md:px-10 px-[7%] h-screen'>
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
                    <div className='flex'>
                      <button className={`border-[1px] border-gray-700`} disabled={CurrentPage===1 ? true : false} onClick={()=>setCurrentPage(CurrentPage-1)}>Prev</button>
                      {numberarray.map(i=>(
                        <button className={`border-[1px] border-gray-700 px-1 ${CurrentPage===i ? "bg-blue-600": null }`} key={i} onClick={()=>setCurrentPage(i)}>&nbsp;&nbsp;{i}&nbsp;&nbsp;</button>
                      ))}
                      <button className={`border-[1px] border-gray-700`} disabled={CurrentPage===total_no_page ? true : false} onClick={()=>setCurrentPage(CurrentPage+1)}>Next</button>
                    </div>
                    <div className='flex items-center bg-green-100'>
                      <BiSearchAlt2 size={30} color='blue'/>
                      <input className='bg-green-100 pl-1 outline-none' type="text" value={Search} onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                  </div>
                  <div className="md:grid grid-cols-3 scroll-smooth w-full border-[1px] ">
                  {records.map(event=> (
                         <div key={event.event_id} className=''>
                          <HackathonPages event={event} navigate={navigate} />
                        </div>
                     ) 
                  )}  
                  </div>
                  <div className='mt-3'>
                    <Footer/>
                  </div>  
                </div>}

            </div>
    </>
  )
}

export default Dashboard