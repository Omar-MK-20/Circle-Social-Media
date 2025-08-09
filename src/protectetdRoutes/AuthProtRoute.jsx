import React from 'react'
import { Navigate } from 'react-router-dom'

function AuthProtRoute({ children }) {
    const isLoggedIn = !!localStorage.getItem('token')
    return isLoggedIn ? <Navigate to={'/'} /> : children
}

export default AuthProtRoute