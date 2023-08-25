import React, { useState } from 'react'

function AddHackathonForm() {
    const [Date, setDate] = useState()
    const [FormData, setFormData] = useState({
        name : "",
        organizerName : ""
    })
    console.log(Date)

    function handleSubmit(event) {
        event.preventDefault();
        console.log("ok");
    }

  return (
    <div>         
        <form onSubmit={()=>handleSubmit()}>
            <div className=' m-4 p-8 bg-gradient-to-b from-blue-500 to-violet-600 rounded-2xl'>
            <div className='inline'>
                <label>Name:</label>
                <input className='rounded-3xl float-right mr-10' type="text" name='name' />
            </div>
            <div className=' mt-3'>
                <label className='inline'>Starts At:</label>
                <input className='rounded-3xl float-right mr-10' type="datetime-local" value={Date} onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div className=' mt-3'>
                <label className='inline'>Ends On:</label>
                <input className='rounded-3xl float-right mr-10' type="date" />
            </div>
            <div className=' mt-3'>
                <label className='inline'>Hackathon Date:</label>
                <input className='rounded-3xl float-right mr-10' type="date" />
            </div>
            <div className=' mt-3'>
                <label className='inline'>Organisation Name:</label>
                <input className='rounded-3xl float-right mr-10' type="text" value={FormData.organizerName} onChange={(e)=>setFormData(e, "organizerName")}/>
            </div>
            <div>
                <label>Organising Mode:</label> <br />
                <select className='rounded-3xl '>
                    <option>Online</option>
                    <option>Offline</option>
                </select>
            </div>
            <div>
                <label>Location</label> <br />
                <input className='rounded-3xl float-right mr-10' type="text" />
            </div>
            <br />
            <div className=''>
                <label>Description :</label> <br />
                <textarea className='rounded-3xl' cols="30" rows="10"></textarea>
            </div>
            <div>
                <label>URL :</label> <br />
                <input className='rounded-3xl' type="url" />
            </div>
            <div>
                <label>Image</label> <br />
                <input className='rounded-3xl' type="file" />
            </div>
            <input type="reset" />
            <input className='rounded-3xl' type="submit" />
            </div>
        </form>
    </div>
  )
}

export default AddHackathonForm