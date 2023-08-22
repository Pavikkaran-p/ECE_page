import React, { useState } from 'react'
// import {Link, useNavigate} from 'react-router-dom'

function RegisterForm() {
    const [RegisterName, setRegisterName] = useState('')
    const [RegisterEmail, setRegisterEmail] = useState('');
    const [RegisterPassword, setRegisterPassword] = useState('');
    const [Registerreenterpassword, setRegisterreenterpassword] = useState('')

    function btn_register(){
        console.log("Registration button cilcked")
    }

    return(
        <div className='h-screen'>
  <div className='h-screen flex flex-col items-center justify-center'>
    <div className='bg-gradient-to-b from-indigo-300 to-zinc-300 rounded-lg shadow p-6 mx-4 sm:mx-auto sm:max-w-md'>
      <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
        <label className='block text-black text-sm font-normal'>Name</label>
        <input
          className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-black text-[25px] font-light'
          type="text"
          value={RegisterName}
          onChange={(e) => setRegisterName(e.target.value)}
        />
      </div>
      <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
        <label className='block text-black text-sm font-normal'>Email</label>
        <input
          type="email"
          className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
          value={RegisterEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
      </div>
      <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
        <label className='block text-black text-sm font-normal'>Password</label>
        <input
          type="password"
          className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
          value={RegisterPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
      </div>
      <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
        <label className='block text-black text-sm font-normal'>Re-enter Password</label>
        <input
          type="password"
          className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
          value={Registerreenterpassword}
          onChange={(e) => setRegisterreenterpassword(e.target.value)}
        />
      </div>
      <div>
        <button
          className='bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 mx-auto block w-full'
          onClick={() => btn_register()}
        >
          Register
        </button>
      </div>
    </div>
  </div>
</div>

    )
}

export default RegisterForm


