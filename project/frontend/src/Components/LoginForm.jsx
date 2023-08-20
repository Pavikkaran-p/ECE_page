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
        <label>Email:</label> <br />
        <input type="email" value={LoginMail} onChange={(e)=>setLoginMail(e.target.value)}/> <br />
        {EmailError} <br />
        <label>Password</label> <br />
        <input type="password" value={LoginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/> <br />
        {PasswordError} <br />
        <p><Link to='forgot_password'>Forgot Password?</Link></p> <br />
        <input value='Login' type='submit'/> <br />
        </form>
    </div>
  )
}

export default LoginForm