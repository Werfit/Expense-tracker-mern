import React from 'react';
import './App.css'

import { useAuth0 } from '@auth0/auth0-react'

// Pages
import { TrackerPage } from './components/TrackerPage'

// Components
import { LogIn } from './components/LogIn'

function App() {
	const { isAuthenticated } = useAuth0()

	if (!isAuthenticated) return <LogIn />

	return (
		<div className="App">
			<TrackerPage />
		</div>
	);
}

export default App;
