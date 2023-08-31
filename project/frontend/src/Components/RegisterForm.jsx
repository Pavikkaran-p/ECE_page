import React, { useState } from 'react'
// import {Link, useNavigate} from 'react-router-dom'

function RegisterForm() {
    const [FormDetails, setFormDetails] = useState({
      name : "",
      email : "",
      password : "",
      re_enter_password : ""
    })

    function formupdate(e){
      setFormDetails({
        ...FormDetails,
        [e.target.name] : e.target.value
    })
    }

    function btn_register(e){
      e.preventDefault();
      fetch('/api/register',{
        method : 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(FormDetails)
      }).then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
    }

    return(
        <div className='h-screen'>
  <div className='h-screen flex flex-col items-center justify-center'>
    <div className='bg-gradient-to-b from-indigo-300 to-zinc-300 rounded-lg shadow p-6 mx-4 sm:mx-auto sm:max-w-md'>
      <form onSubmit={btn_register}>
        <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
          <label className='block text-black text-sm font-normal'>Name</label>
          <input
            className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-black text-[25px] font-light'
            type="text"
            name='name'
            onChange={formupdate}
            required
          />
        </div>
        <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
          <label className='block text-black text-sm font-normal'>Email</label>
          <input
            type="email"
            className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
            name='email'
            onChange={formupdate}
            required
          />
        </div>
        <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
          <label className='block text-black text-sm font-normal'>Password</label>
          <input
            type="password"
            className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
            name='password'
            onChange={formupdate}
            required
          />
        </div>
        <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
          <label className='block text-black text-sm font-normal'>Re-enter Password</label>
          <input
            type="password"
            className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
            name='re_enter_password'
            onChange={formupdate}
            required
          />
        </div>
        <div>
          <input
            className='bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 mx-auto block w-full' type='submit' />
        </div>
      </form>
    </div>
  </div>
</div>

    )
}

export default RegisterForm


