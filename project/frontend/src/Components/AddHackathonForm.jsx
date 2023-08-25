// import { func } from 'prop-types';
import React, { useState } from 'react';
// import { json } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddHackathonForm() {
    const [formdata, setFormData] = useState({
        name : "",
        register_start_date : "",
        register_end_date : "",
        hackathon_date:"",
        organising_name : "",
        organising_mode : "online",
        location : "",
        description : "",
        url : "",
    })
    const [EventImage, setEventImage] = useState(null)
    console.log(formdata)
    function handleFormChange(e){
        setFormData({
            ...formdata,
            [e.target.name] : e.target.value
        })
    }
    function handlefileChange (e){
        let file = e.target.files[0]
        setEventImage(file)
    }

    function handleSubmit(e){
        e.preventDefault()
        let formdata2 = new FormData()
        formdata2.append('image', EventImage)
        for (var key in formdata){
            formdata2.append(key, formdata[key])
        }
        fetch('/gethackathons',{
            method:'POST',
            headers :{
                'Authorization' : `Bearer ${localStorage.getItem('Token')}`
            },
            body:formdata2
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.msg)
        })
    }
            

             
    

  return (
    <div>         
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
            <div className=' m-4 p-8 bg-gradient-to-b from-blue-500 to-violet-600 rounded-2xl'>
            <div className='inline'>
                <label>Name:</label>
                <input className='rounded-3xl float-right mr-10' type="text" name='name' onChange={handleFormChange} required/>
            </div>
            <div className=' mt-3'>
                <label className='inline'>Starts At:</label>
                <input className='rounded-3xl float-right mr-10' type="datetime-local" name='register_start_date' onChange={handleFormChange} required/>
            </div>
            <div className=' mt-3'>
                <label className='inline'>Ends On:</label>
                <input className='rounded-3xl float-right mr-10' type="datetime-local" name='register_end_date' onChange={handleFormChange} required/>
            </div>
            <div className=' mt-3'>
                <label className='inline'>Hackathon Date:</label>
                <input className='rounded-3xl float-right mr-10' type="datetime-local" name='hackathon_date' onChange={handleFormChange} required/>
            </div>
            <div className=' mt-3'>
                <label className='inline'>Organisation Name:</label>
                <input className='rounded-3xl float-right mr-10' type="text" name='organising_name' onChange={handleFormChange} required/>
            </div>
            <div>
                <label>Organising Mode:</label> <br />
                <select className='rounded-3xl' defaultValue="online" name='organising_mode' onChange={handleFormChange} required>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
            {formdata.organising_mode === "offline" &&
            <div>
                <label>Location</label> <br />
                <input className='rounded-3xl float-right mr-10' type="text" name='location' onChange={handleFormChange} required/>
            </div>
            }
            <br />
            <div className=''>
                <label>Description :</label> <br />
                <textarea className='rounded-3xl' cols="30" rows="10" name='description' onChange={handleFormChange} required></textarea>
            </div>
            <div>
                <label>URL :</label> <br />
                <input className='rounded-3xl' type="url" name='url' onChange={handleFormChange} required/>
            </div>
            <div>
                <label>Image</label> <br />
                <input className='rounded-3xl' type="file" name='image' onChange={handlefileChange} required/>
            </div>
            <input type="reset" />
            <input className='rounded-3xl' type="submit" />
            </div>
        </form>
    </div>
  )
}

export default AddHackathonForm