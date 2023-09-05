import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../Components/Header'
// import Header from '../Components/Header'

function Event() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [IsLoading, setIsLoading] = useState(true)
    const [Details, setDetails] = useState([])

    useEffect(()=>{
      fetch(`/api/event/${id}`,{
        method : 'GET',
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem('Token')}`
        }
      }).then(resp => resp.json())
      .then(data => {
        setDetails(data.details);
      })
    },[])

  return (
    <div>
          <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div>
          {/* {'event_id': 66, 'name': 'SIH2', 'register_start_date': datetime.datetime(2023, 8, 26, 22, 5), 
          'register_end_date': datetime.datetime(2023, 9, 2, 18, 5), 'hackathon_date': datetime.datetime(2023, 9, 9, 18, 5), '
          organisation_name': 'Sri Eshwar', 'Organising_mode': 'online', 'location': '', 
          'description': 'This is a nation level hacathon and the next round', 'url': 'http://www.sih.com', 
          'image_hackathon': 'https://sece-events.s3.amazonaws.com/2023-08-26_19-03-32_Screenshot 2023-05-05 211616.png', '
          added_date': datetime.datetime(2023, 8, 26, 19, 3, 38)} */}
          <p>{Details.name}</p>
          <img className='w-96' src={Details.image_hackathon} alt=''/>
          <div>
            <p>{Details.register_start_date}</p>
            <p>{Details.register_end_date}</p>
            <p>{Details.hackathon_date}</p>
            {/* Remaing should be added */}
            {/* <p>{}</p> */}
          </div>
        </div>
    </div>
  )
}

export default Event