import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function RegisterForm() {
    return(
        <div className='h-screen'>
            <div className='flex flex-col'>
                <div>Email</div>               
                <div>Password</div>
                <div>Re-enter Password</div>
            </div>
        </div>
    )
}

export default RegisterForm


