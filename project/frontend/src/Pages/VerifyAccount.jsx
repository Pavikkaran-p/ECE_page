import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyAccount() {
    const {jwt} = useParams()
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Error, setError] = useState('')

    async function submitVerification (){
       try {
            const response = await fetch('/registerverify',{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ 'password' : ConfirmPassword })
            })
            const data = await response.json()
            console.log(data)
            if(data.status){
                toast.success("Account Verified",{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                window.location.href = "/"
            } else {
                toast.error(data.msg,{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }
       } catch {
        setError("Backend Error")
       }

    }
  return (
    <div>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        {Error}
        <p>To Confirm the Account</p>
        <div>
            <label >Password </label>
            <input className='border-2 border-black rounded-sm px-2' type="password" value={ConfirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
        <button onClick={()=>submitVerification()}>Verify Account</button>
    </div>
  )
}

export default VerifyAccount