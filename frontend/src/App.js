import React, { useState } from 'react';
import OtpInput from './components/OtpInput';
import SiteSelection from './components/SiteSelection';
import './index.css';

function App() {
    const [sites, setSites] = useState([]);
    const [isVerified, setIsVerified] = useState(false);

    const handleLogout = () => {
        console.log('Logging out...'); // Debug log
        setSites([]); // Reset sites to log out
        setIsVerified(false); // Reset verification status
        console.log('State after logout:', { sites: [], isVerified: false }); // Log state after reset
    };

    return (
        <div className="app-container">
            {!isVerified ? (
                <OtpInput onVerify={(sites) => { 
                    setSites(sites); 
                    setIsVerified(true); 
                }} />
            ) : (
                <SiteSelection sites={sites} onLogout={handleLogout} /> 
            )}
        </div>
    );
}

export default App;