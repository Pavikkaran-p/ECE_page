import React, {  } from 'react'
import { Link } from 'react-router-dom'

function HackathonPages({event, navigate}) {
    // const [CurrentPage, setCurrentPage] = useState(1);
    // console.log(LengthofCurrentSearch)
    function applicationStatus(){
      if (new Date(event.register_start_date) > new Date()) return "Starting Soon";
      else if (new Date(event.register_start_date) < new Date() && new Date(event.register_end_date) > new Date()) return "Apply Now"
      else if (new Date(event.register_end_date) < new Date() && new Date(event.hackathon_date) > new Date()) return "Registration Completed"
      else return "Event Completed"
    }
  return (
    <div className='w-full'>
         <div className={`flex md:mx-14 gap-1 p-1 my-2 border-black border-2 ${ new Date(event.register_start_date) > new Date() ? 'bg-red-500': null} ${ new Date(event.hackathon_date) < new Date() ? 'bg-red-300': null} ${ new Date(event.register_end_date) < new Date() ? 'bg-orange-300': null} `  } >
            <div className='flex items-center w-[50%] object-cover'><Link to={`/event/${event.event_id}`}><img className='h-60 object-cover' src={event.image_hackathon} alt="" /></Link></div>
            <div className='w-[50%]'>
              <div className='font-bold uppercase -mb-2'>
                <p><Link to={`/event/${event.event_id}`}>{event.name}</Link></p>
              </div>
              <div>
                <p className='line-clamp-1 overflow-hidden text-gray-600'><Link to={`/organisation/${event.organisation_name}`}>{event.organisation_name}</Link></p>
                <p className='line-clamp-1 overflow-hidden text-sm'>{event.Organising_mode}</p>
                <p className='line-clamp-1 overflow-hidden text-sm'>{event.location} Remote</p> 
                <p className='line-clamp-1 overflow-hidden text-sm'>📆{new Date(event.register_start_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' ,hour: 'numeric', minute: 'numeric'}) }</p>
                <p className='line-clamp-1 overflow-hidden text-sm'>📆{new Date(event.register_end_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' ,hour: 'numeric', minute: 'numeric'})}</p>
                <p className='line-clamp-1 overflow-hidden text-sm'>📆{new Date(event.hackathon_date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' ,hour: 'numeric', minute: 'numeric'})}</p>
              </div>
              <div>
                <button className='font-bold border-white' onClick={()=>navigate(`/organisation/${event.event_id}`)}>
                  {applicationStatus()}
                  {/* {
                    new Date(event.register_start_date) > new Date() ? "Starting Soon" : new Date(event.hackathon_date) > new Date() ? "Apply" : new Date(event.register_end_date) > new Date() ? "Registration Completed" : "Hackathon Completed"
                        } */}
                        </button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default HackathonPages