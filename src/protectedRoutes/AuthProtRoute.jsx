import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';

function AuthProtRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? <Navigate to={'/'} /> : children;
}

export default AuthProtRoute