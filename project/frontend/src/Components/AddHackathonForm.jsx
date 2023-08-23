import React, { useState } from 'react'

function AddHackathonForm() {

    const [FormData, setFormData] = useState({
        name : "",
        organizerName : ""
    })
    console.log(FormData)

    function handleSubmit(event) {
        event.preventDefault();
        console.log("ok");
    }

  return (
    <div>         
        <form onSubmit={()=>handleSubmit()}>
            <div>
                <label>Name:</label> <br />
                <input type="text" name='name' />
            </div>
            <div>
                <label>Registration Starts At:</label> <br />
                <input type="date" />
            </div>
            <div>
                <label>Registration Ends On:</label> <br />
                <input type="date" />
            </div>
            <div>
                <label>Hackathon Date:</label> <br />
                <input type="date" />
            </div>
            <div>
                <label>College/Organisation Name:</label> <br />
                <input type="text" value={FormData.organizerName} onChange={(e)=>setFormData(e, "organizerName")}/>
            </div>
            <div>
                <label>Organising Mode:</label> <br />
                <select>
                    <option>Online</option>
                    <option>Offline</option>
                </select>
            </div>
            <div>
                <label>Location</label> <br />
                <input type="text" />
            </div>
            <div className=''>
                <label>Description :</label> <br />
                <textarea cols="30" rows="10"></textarea>
            </div>
            <div>
                <label>URL :</label> <br />
                <input type="url" />
            </div>
            <div>
                <label>Image</label> <br />
                <input type="file" />
            </div>
            <input type="reset" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default AddHackathonForm