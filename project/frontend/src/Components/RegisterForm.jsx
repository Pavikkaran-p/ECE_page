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
            <div className='flex flex-col'>
                <div>
                    <label>Name</label>
                    <input type="text" value={RegisterName} onChange={(e)=>setRegisterName(e.target.value)}/>
                </div>
                <div>
                    <label >Email</label>
                    <input type="email" value={RegisterEmail} onChange={(e)=>setRegisterEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={RegisterPassword} onChange={(e)=>setRegisterPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Re-enter Password</label>
                    <input type="password" value={Registerreenterpassword} onChange={(e)=>setRegisterreenterpassword(e.target.value)} />
                </div>
                <div>
                    <button onClick={()=>btn_register()}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm


