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
        <div class="m-4 p-8 bg-gradient-to-b from-blue-500 to-violet-600 rounded-2xl">
    <div class="mb-4">
        <label class="block">Name:</label>
        <input class="rounded-lg w-full mt-1" type="text" name="name" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Starts At:</label>
        <input class="rounded-lg w-full mt-1" type="datetime-local" name="register_start_date" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Ends On:</label>
        <input class="rounded-lg w-full mt-1" type="datetime-local" name="register_end_date" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Hackathon Date:</label>
        <input class="rounded-lg w-full mt-1" type="datetime-local" name="hackathon_date" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Organisation Name:</label>
        <input class="rounded-lg w-full mt-1" type="text" name="organising_name" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Organising Mode:</label>
        <select class="rounded-lg w-full mt-1" defaultValue="online" name="organising_mode" onChange={handleFormChange} required>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </select>
    </div>
    {formdata.organising_mode === "offline" && (
        <div class="mb-4">
            <label class="block">Location</label>
            <input class="rounded-lg w-full mt-1" type="text" name="location" onChange={handleFormChange} required />
        </div>
    )}
    <div class="mb-4">
        <label class="block">Description :</label>
        <textarea class="rounded-lg w-full mt-1" cols="30" rows="6" name="description" onChange={handleFormChange} required></textarea>
    </div>
    <div class="mb-4">
        <label class="block">URL :</label>
        <input class="rounded-lg w-full mt-1" type="url" name="url" onChange={handleFormChange} required />
    </div>
    <div class="mb-4">
        <label class="block">Image</label>
        <input class="w-full mt-1 " type="file" title='Add' name="image" onChange={handlefileChange} required />
    </div>
    <div class="flex justify-between">
        <input class="rounded-lg bg-gray-300 hover:bg-gray-400 px-4 py-2" type="reset" value="Reset" />
        <input class="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2" type="submit" value="Submit" />
    </div>
</div>

        </form>
    </div>
  )
}

export default AddHackathonForm