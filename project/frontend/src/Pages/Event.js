import React from 'react'
import { useParams } from 'react-router-dom'
// import Header from '../Components/Header'

function Event() {
    const {id} = useParams()
  return (
    <div>
        {/* <Header/> */}
        Events
        {id}
    </div>
  )
}

export default Event