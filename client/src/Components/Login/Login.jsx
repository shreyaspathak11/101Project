import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'         // useState is a hook that lets you add React state to function components
import { Link } from 'react-router-dom'
import './Login.css'
import {useDispatch} from 'react-redux'         // useDispatch is a hook that returns a reference to the dispatch function from the Redux store
import { loginUser } from '../../Actions/User'

const Login = () => {
    const [email, setEmail] = useState('')                  
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()                  

    const loginHandler = (e) => {                   // loginHandler function
        e.preventDefault()                          // preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        dispatch(loginUser(email, password))        // dispatching loginUser action
    }
  return (
    <div className='login'>
        <form className='loginForm' onSubmit={loginHandler}>
            <Typography variant="h3" style={{padding: "2vmax"}}>
            Socialite
            </Typography>

            <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Link to="/forgot/password">
            <Typography> Forgot password?</Typography>
            </Link>

            <Button type="submit">Login</Button>
            <Link to="/register">
            <Typography> Don't have an account? Register</Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login