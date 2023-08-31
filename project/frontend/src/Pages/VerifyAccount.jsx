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
            const response = await fetch('/api/registerverify',{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ 'password' : ConfirmPassword })
            })
            const data = await response.json()
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
            } else {
                toast.error(data.message,{
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
    console.log(Error)

  return (
    <div className='w-full px-[30%] bg-gradient-to-tr from-blue-700 to-green-700'>
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
        <header className='px-[10%] flex justify-between'>
            <div className=''>
                <img src="https://i1.rgstatic.net/ii/institution.image/AS:267483406110721%401440784421397_l" alt="" />
            </div>
            <div className='text-2xl text-white'>
                Verify Page
            </div>
        </header>
        <div className='h-screen flex justify-center items-center'>
            <div className='border-[2px] border-white p-[2%] '>
                <p className='text-3xl text-white'>To Confirm the Account</p>
                <div className='py-2'>
                    <label className='animate-pulse text-white font-semibold'>Password </label> <br />
                    <input className='border-2 border-white rounded-sm px-2' type="password" value={ConfirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button className='border-2 bg-blue-700 p-2 rounded-xl text-white font-bold' onClick={()=>submitVerification()}>Verify Account</button>
            </div>
        </div>
    </div>
  )
}

export default VerifyAccount