import React from 'react'
import { useParams } from 'react-router-dom'

function Organisation() {
    const {name} = useParams()
  return (
    <div>
        Organisation
        <p>{name}</p>
    </div>
  )
}

export default Organisation