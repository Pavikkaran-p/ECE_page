import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header';
import {CiFilter} from 'react-icons/ci'
import { BiSearchAlt2 } from 'react-icons/bi'
import HackathonPages from '../Components/HackathonPages';

function Dashboard() {
    document.title = "Dashboard"
    const navigate = useNavigate();
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [Search, setSearch] = useState('');
    const [Events, setEvents] = useState([])
    const [ShowFilter, setShowFilter] = useState(false)
    const [Filter, setFilter] = useState({
      department : "",
      mode : ""
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
      console.log(data)
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
    console.log('====================================');
    console.log(Events.length);
    console.log('====================================');
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
                  <div className='flex md:justify-end mx-14 gap-3'>
                    <div className='relative'>
                      <CiFilter size={30} onClick={()=>setShowFilter(!ShowFilter)} className='md:block hidden'/>
                      <ul className={`absolute bg-white px-2 border-2 ${ShowFilter ? 'block':'hidden'}`}>
                        <li className='flex'>Department 
                          <select name='department' onChange={handlefilterchange} defaultValue=''>
                            <option value="">ALL</option>
                            <option value="aids">AIDS</option>
                            <option value="ece">ECE</option>
                          </select>
                        </li>  
                        <li className='flex'>Mode      
                          <select name='mode' onChange={handlefilterchange} defaultValue="">
                            <option value="">ANY</option>
                            <option value="online">ONLINE</option>
                            <option value="offline">OFFLINE</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                    <div className='flex items-center bg-green-100'>
                    <BiSearchAlt2 size={30} color='blue'/>
                    <input className='bg-green-100 pl-1 outline-none' type="text" value={Search} onChange={(e)=>setSearch(e.target.value)}/>
                    </div>
                  </div>
                  <div className='md:grid grid-cols-3 scroll-smooth'>
                  {Events.map(event=>{
                     if( ((event.Organising_mode).toLowerCase()).includes(Filter.mode) && (((event.name).toLowerCase()).includes(Search) || ((event.organisation_name).toLowerCase()).includes(Search)) ) {
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