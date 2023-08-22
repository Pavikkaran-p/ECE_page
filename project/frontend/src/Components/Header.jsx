import React, {useEffect, useState} from 'react'
import {IoIosLogIn,IoIosClose} from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'

function Header() {
    const [LoginIcon, setLoginIcon] = useState(false);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    const [ProfileList, setProfileList] = useState(false);
    const navigator = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('Token')
      if(token != null){
        fetch('/checkjwt',{
          method: 'GET',
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            navigator('/home')
          }
          return response.json();
      })
        .then(data => {
          if (data.status){
            setIsLoggedIn(true)
          }
        })
      } else {
        setIsLoggedIn(false)
      }
    },[navigator])

    function logout(){
      localStorage.removeItem('Token')
      navigator('/')
    }

  return (
    <nav className='flex justify-between items-center px-3'>
        <img className='w-10' src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg" alt="" />
        <p className='uppercase font-bold'>Hackathon Page</p>
        {
          !IsLoggedIn
          ?
          <div>
          <div className='md:flex gap-3 hidden'>
              <p><Link to='/login'>Login</Link></p>
              <p><Link to='/register'>Register</Link></p>
          </div>
            <p className={`${!LoginIcon ? "block" : "hidden"} md:hidden`} onClick={()=>setLoginIcon(true)}><IoIosLogIn size={30}/></p>
            <div className={`${LoginIcon ? "block" : "hidden"}`}>
              <ul className=' fixed right-2 top-0 space-y-3'>
              <li onClick={()=>setLoginIcon(false)} className='flex justify-end'><IoIosClose size={30}/></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
              </ul>
            </div>
          </div>
          :
          <div>
            <CgProfile size={30} onClick={()=>setProfileList(!ProfileList)} className='relative'/>
            {
            ProfileList && 
            <div className='absolute right-4 shadow-sm border-2 px-1 py-3 rounded-xl top-10 border-black'>
              <ul className=''>
                <li className='md:hover:bg-blue-100 rounded px-2'><Link to='/profile'>Profile</Link></li>
                <li className='md:hover:bg-blue-100 rounded px-2 hover:cursor-pointer' onClick={()=>logout()}>Logout</li>
              </ul>
            </div>
            }
          </div>
        }
    </nav>
  )
}

export default Header