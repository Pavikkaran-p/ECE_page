import React, {useEffect, useState} from 'react'
import {IoIosLogIn,IoIosClose} from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'

function Header({IsLoggedIn, setIsLoggedIn}) {
    const [LoginIcon, setLoginIcon] = useState(false);
    const [ProfileList, setProfileList] = useState(false);
    const [IsLoading, setIsLoading] = useState(true);
    const [UserName, setUserName] = useState('')
    const [UserRole, setUserRole] = useState('')
    const navigator = useNavigate();
    useEffect(()=>{
      const token = localStorage.getItem('Token')
      if(token != null){
        fetch('/api/checkjwt',{
          method: 'GET',
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            navigator('/login')
            setIsLoading(false)
          }
          return response.json();
      })
        .then(data => {
          if (data.status){
            setUserName(data.name)
            setUserRole(data.role)
            setIsLoggedIn(true)
            setIsLoading(false)
          }
        })
      } else {
        setIsLoggedIn(false)
        setIsLoading(false)
        navigator('/')
      } 
    },[navigator,setIsLoggedIn])

    function logout(){
      localStorage.removeItem('Token')
      localStorage.removeItem('Role')
      localStorage.removeItem('Id')
      navigator('/')
    }

  return (
    <>
      {
      IsLoading ? 
      <div>

      </div>
      :
      <nav className='flex justify-between items-center px-3 bg-gradient-to-r from-green-400 to-blue-600'>
        <Link to='/'><img className='w-10 py-1' src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg" alt='logo'/></Link>
        <p className='uppercase font-bold'>Event @SECE</p>
        {
          !IsLoggedIn
          ?
          <div>
          <div className='md:flex gap-2 hidden'>
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
            <div className='absolute right-4 shadow-sm border-2 px-1 py-3 rounded-xl top-10 border-black bg-white'>
              <ul className=''>
                <li className='md:hover:bg-blue-100 rounded px-2'><Link to={`/profile/${localStorage.getItem('Id')}`}><div>Profile</div><div className='text-xs'>{UserName}</div></Link></li>                
                {UserRole === 'student' &&
                  <li className='md:hover:bg-blue-100 rounded px-2'><Link>Your Events</Link></li>}
                {UserRole === 'admin' &&
                  <li className='md:hover:bg-blue-100 rounded px-2'><Link to="/hackathonmodifier">Manage Event</Link></li>}
                <li className='md:hover:bg-blue-100 rounded px-2'><Link>Contact Us  </Link></li>
                <li className='md:hover:bg-blue-100 rounded px-2 hover:cursor-pointer' onClick={()=>logout()}>Logout</li>
              </ul>
            </div>
            }
          </div>
        }
    </nav>
    }
    </>
  )
}

export default Header