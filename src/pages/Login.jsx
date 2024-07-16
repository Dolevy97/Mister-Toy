import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../cmps/LoginForm.jsx";
import { login, signup } from '../store/actions/user.actions.js';


export function Login() {
    const [userInfo, setUserInfo] = useState('')
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setUserInfo(prevUser => ({ ...prevUser, [field]: value }))
    }

    async function onSubmit() {
        let newUser = {}
        if (isSignup) {
            newUser.fullname = userInfo.fullname
        }
        newUser.username = userInfo.username
        newUser.password = userInfo.password
        try {
            let user
            if (isSignup) {
                user = await signup(newUser)
            } else {
                user = await login(newUser)
            }

            if (user) {
                navigate('/')
            } else {
                console.log('User info is not valid')
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    return (
        <div className="login-signup-container">
            <h2>Mister Toy</h2>
            <h3>{isSignup ? 'Sign up to continue' : 'Log in to continue'}</h3>
            <LoginForm onSubmit={onSubmit} handleChange={handleChange} setIsSignup={setIsSignup} isSignup={isSignup} />
        </div>
    )
}