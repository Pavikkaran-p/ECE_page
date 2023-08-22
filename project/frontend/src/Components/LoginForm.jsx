import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function LoginForm() {
    document.title = "Login"
    const navigate = useNavigate()
    const [LoginMail, setLoginMail] = useState('')
    const [LoginPassword, setLoginPassword] = useState('')
    const [Error, setError] = useState('')
    const [EmailError, setEmailError] = useState('')
    const [PasswordError, setPasswordError] = useState('')

    async function handleLogin(event){
        event.preventDefault()
        setEmailError('')
        setPasswordError('')
        const response = await fetch("/login",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email : LoginMail, password : LoginPassword})
        })
        const data = await response.json()
        if(data.status){
            localStorage.setItem('Token', data.token)
            // window.location.href = "dashboard"
            navigate('/dashboard',{replace:true})
        }
        else{
            if(data.type === 'Invalid Syntax'){
                setEmailError(data.message.email)
                setPasswordError(data.message.password)
            } else {
                setError("Invalid Credentials")
            }
        }
    }

  return (
    <div className='h-screen'>
    <form onSubmit={handleLogin}>
            {Error}
<div className='h-screen flex items-center justify-center'>
        <div className='bg-gradient-to-b from-indigo-300 to-zinc-300 rounded-lg shadow p-6 mx-4 sm:mx-auto sm:max-w-md'>
          <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-4'>
            <label className='block text-black text-sm font-normal'>Email</label>
            <input
              type='email'
              className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md '
              value={LoginMail}
              onChange={(e) => setLoginMail(e.target.value)}
            />
      {EmailError && <p className='text-red-500 text-xs mt-1'>{EmailError}</p>}
          </div>
          <div className='bg-gradient-to-b from-slate-300 to-slate-300 rounded-lg p-5 mt-4'>
            <label className='block text-black text-sm font-normal'>Password</label>
            <input
              type='password'
              className='w-full mt-1 px-2 py-1 border border-gray-300 rounded-md'
              value={LoginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {PasswordError && <p className='text-red-500 text-xs mt-1'>{PasswordError}</p>}
            <p className='text-xs mt-2'>
              <Link to='forgot_password' className='text-blue-500 hover:underline'>
                Forgot Password?
              </Link>
            </p>
          </div>
          <button className='bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6 mx-auto block w-full'>
            Login
          </button>
        </div>
</div>

        </form>
    </div>
  )
}

export default LoginForm


