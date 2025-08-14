import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContextProvider'

function MainProtRoute({ children }) {
    // const isLoggedIn = !!localStorage.getItem('token')
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to={'/login'} />
}

export default MainProtRoute