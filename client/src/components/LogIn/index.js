import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import './LogIn.css'

export const LogIn = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <button className="logInButton" onClick={ () => loginWithRedirect() }>
            Log in
        </button>
    )
}
