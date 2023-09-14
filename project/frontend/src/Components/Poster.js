import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Poster() {
    const [FormDetails, setFormDetails] = useState({
        name : "",
        type : "hackathon",
    })
    const [SubmitButton, setSubmitButton] = useState(true)
    const [PosterImage, setPosterImage] = useState(null)
    function formupdate(e){
        setFormDetails({
            ...FormDetails,
            [e.target.name] : e.target.value
    })
    }
    function imageupdate(e){
            let file = e.target.files[0]
            setPosterImage(file)
    }
    // console.log(FormDetails)
    function handle_addposter(e){
        e.preventDefault()
        setSubmitButton(false)
        let formdata = new FormData()
        formdata.append('image',PosterImage)
        for (var key in FormDetails){
            formdata.append(key, FormDetails[key])
        }
        fetch('/api/eventposter',{
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('Token')}`
            },
            body : formdata
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.status){
                toast.success(
                    "Poster Generated and added successfully",{
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
                document.getElementById('poster_form').reset()
                setSubmitButton(true)
            }
        })
    }
  return (
    <div>
        <ToastContainer/>
        <form
  id="poster_form"
  onSubmit={handle_addposter}
  onReset={() => setFormDetails({ type: "hackathon" })}
  className="m-4 p-8 bg-gradient-to-b from-blue-500 to-violet-600 rounded-2xl shadow-lg"
>
  <div className="mb-4">
    <label className="block text-white">Name :</label>
    <input
      type="text"
      name="name"
      onChange={formupdate}
      required
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
    />
  </div>
  <div className="mb-4">
    <label className="block text-white">Type :</label>
    <select
      name="type"
      defaultValue="hackathon"
      onChange={formupdate}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
    >
      <option value="hackathon">Hackathon</option>
      <option value="event">Events</option>
      <option value="conference">Conference</option>
    </select>
  </div>
  <div className="mb-4">
    <label className="block text-white">Image :</label>
    <input
      type="file"
      name="image"
      onChange={imageupdate}
      required
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
    />
  </div>
  <div className="flex items-center justify-between">
    <input
      type="reset"
      className="px-4 py-2 text-white bg-indigo-500 rounded-md cursor-pointer hover:bg-indigo-600"
    />
    <input
      type="submit"
      disabled={!SubmitButton}
      className={`px-4 py-2 text-white bg-indigo-300 rounded-md cursor-pointer ${
        SubmitButton ? "hover:bg-indigo-400" : "bg-gray-300"
      }`}
    />
  </div>
</form>

    </div>
  )
}

export default Poster