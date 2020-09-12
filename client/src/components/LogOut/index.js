import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './LogOut.css'

export const LogOut = () => {
    const { logout } = useAuth0()
    return (
        <button className="logOutButton" onClick={ () => logout() }>
            Log Out
        </button>
    )
}
