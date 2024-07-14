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
        try {
            let user
            if (isSignup) {
                user = await signup(userInfo)
            } else {
                user = await login(userInfo)
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
            <h3>Log in to continue</h3>
            <LoginForm onSubmit={onSubmit} handleChange={handleChange} />
        </div>
    )
}