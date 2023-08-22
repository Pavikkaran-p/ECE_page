import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
// import IsLoading from './IsLoadingPage';
import { useParams } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci'
import IsLoadingPage from './IsLoadingPage';
function Profile() {
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [IsEditable, setIsEditable] = useState(false);
    const [UserDetails, setUserDetails] = useState([]);
    const [UsernotFound, setUsernotFound] = useState(false)
    const [IsLoading, setIsLoading] = useState(true)
    const { id } = useParams();

    useEffect(()=>{
        fetch(`/userdetails/${id}`,{
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('Token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status){
                setUserDetails(data.details)
                console.log(data.details)
                setUsernotFound(false)
                setIsLoading(false)
                console.log("Will send his/her Information")
            }
            else {
                setUsernotFound(true)
                setIsLoading(false)
            }
            if (data.editable){
                setIsEditable(true)
                setIsLoading(false)
            }
        })
    },[])

  return (
    <div>
        <Header IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        {IsLoading &&
        <IsLoadingPage/>}
        <div>
            {UsernotFound && 
            <div className='h-screen fixed bg-white w-full text-5xl flex justify-center items-center'>
                NoUserFound    
            </div>}
        </div>
        <div className='md:flex p-4'>
            <div className='md:w-1/2 px-[2%]'>
                <div className='flex text-4xl items-center  bg-gray-100 justify-between'>
                    Profile {IsEditable && <CiEdit className='hover:cursor-pointer' size={40}/>}
                </div>
                Name:
                <div className='border-2 border-black w-1/2'>
                    <p className='text-gray-500'>{UserDetails.name}</p>
                </div>
                Email:
                <div className='border-2 border-black w-1/2'>
                    <p className='text-gray-500'>{UserDetails.email}</p>
                </div>
                Phone:
                <div className='border-2 border-black w-1/2'>
                    {!UserDetails.phone ?
                        <p className='text-gray-500'>Not updated</p>
                    :
                        <p className='text-gray-500'>{UserDetails.phone}</p>
                    }
                </div>
            </div>
            <div className='md:w-1/2 pt-3 px-[2%] text-3xl'>
                More on
            </div>
        </div>
    </div>
  )
}

export default Profile