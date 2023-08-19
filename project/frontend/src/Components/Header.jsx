import React, {useState} from 'react'
import {IoIosLogIn,IoIosClose} from 'react-icons/io'
import { Link } from 'react-router-dom'

function Header() {
    const [LoginIcon, setLoginIcon] = useState(false)
  return (
    <nav className='flex justify-between items-center px-3'>
        <img className='w-10' src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg" alt="" />
        <p className='uppercase font-bold'>Hackathon Page</p>
        <div className='md:flex gap-3 hidden'>
            <p><Link to='/login'>Login</Link></p>
            <p><Link to='/signup'>Register</Link></p>
        </div>
        <p className={`${!LoginIcon ? "block" : "hidden"} md:hidden`} onClick={()=>setLoginIcon(true)}><IoIosLogIn size={30}/></p>
        <div className={`${LoginIcon ? "block" : "hidden"}`}>
            <ul className=' fixed right-2 top-0 space-y-3'>
            <li onClick={()=>setLoginIcon(false)} className='flex justify-end'><IoIosClose size={30}/></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Register</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header