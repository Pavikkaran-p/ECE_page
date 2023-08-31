import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
        fetch('/api/gethackathons',{
            method:'POST',
            headers :{
                'Authorization' : `Bearer ${localStorage.getItem('Token')}`
            },
            body:formdata2
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.status){
                toast.success(
                    "Event Added Successfully",{
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                  }
                  )
                  document.getElementById('hackathonForm').reset() 
            }
        })
    }
            

             
    

  return (
    <div>         
        <ToastContainer/>
        <form onSubmit={handleSubmit} id='hackathonForm' onReset={()=>setFormData({organising_mode:'online'})}>
        <div className="m-4 p-8 bg-gradient-to-b from-blue-500 to-violet-600 rounded-2xl">
        <div className='flex justify-center text-white text-2xl font-bold uppercase'>ADD HERE</div>
    <div className="mb-4">
        <label className="block">Name:</label>
        <input className="rounded-lg w-full mt-1" type="text" name="name" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Starts At:</label>
        <input className="rounded-lg w-full mt-1" type="datetime-local" name="register_start_date" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Ends On:</label>
        <input className="rounded-lg w-full mt-1" type="datetime-local" name="register_end_date" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Hackathon Date:</label>
        <input className="rounded-lg w-full mt-1" type="datetime-local" name="hackathon_date" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Organisation Name:</label>
        <input className="rounded-lg w-full mt-1" type="text" name="organising_name" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Organising Mode:</label>
        <select className="rounded-lg w-full mt-1" defaultValue="online" name="organising_mode" onChange={handleFormChange} required>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
        </select>
    </div>
    {formdata.organising_mode === "offline" && (
        <div className="mb-4">
            <label className="block">Location</label>
            <input className="rounded-lg w-full mt-1" type="text" name="location" onChange={handleFormChange} required />
        </div>
    )}
    <div className="mb-4">
        <label className="block">Description :</label>
        <textarea className="rounded-lg w-full mt-1" cols="30" rows="6" name="description" onChange={handleFormChange} required></textarea>
    </div>
    <div className="mb-4">
        <label className="block">URL :</label>
        <input className="rounded-lg w-full mt-1" type="url" name="url" onChange={handleFormChange} required />
    </div>
    <div className="mb-4">
        <label className="block">Image</label>
        <input className="w-full mt-1 " type="file" title='Add' name="image" onChange={handlefileChange} required />
    </div>
    <div className="flex justify-between">
        <input className="rounded-lg bg-gray-300 hover:bg-gray-400 px-4 py-2" type="reset" value="Reset" />
        <input className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2" type="submit" value="Submit" />
    </div>
</div>

        </form>
    </div>
  )
}

export default AddHackathonForm