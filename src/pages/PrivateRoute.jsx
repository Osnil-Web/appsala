import React from 'react'
import { Outlet, Navigate,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
function PrivateRoute() {
    // const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const handleLogout = () => {
    //     // Perform logout logic, clear authentication state, and any cleanup tasks
    //     setIsAuthenticated(false);
    //     navigate('/')
    //     // Optionally, clear tokens or session data here
    //   };

    if (isAuthenticated){
        return(
        <>
        {/* <button onClick={handleLogout}>Logout</button> */}
        <Outlet/>
        </>
        )
    } else{
        return <Navigate to='/'/>
    }
}

export default PrivateRoute