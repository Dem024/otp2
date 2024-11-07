import React, { useState } from 'react';
import axios from 'axios';
import SiteSelection from './SiteSelection'; // Import SiteSelection component
import '../index.css'; // Ensure your styles are imported here

function OtpInput() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [sites, setSites] = useState([]);

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/request-otp', { email });
            alert(response.data.message); // Alert on success
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Network error'); // Alert on failure
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
            alert(response.data.message); // Alert on success
            setSites(response.data.sites); // Set sites received from backend
            setIsVerified(true); // Mark as verified
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Invalid OTP. Please try again.'); // Popup for invalid OTP
            } else {
                alert(error.response ? error.response.data.message : 'Network error');
            }
        }
    };

    const handleLogout = () => {
        setIsVerified(false); 
        setEmail(''); 
        setOtp(''); 
        setSites([]); 
    };

    return (
        <div className="app-container"> 
             <h2>TKIL Document Reading System</h2>
            <h2>Welcome !!!</h2>
            {!isVerified ? (
                <>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <button onClick={sendOtp}>Send OTP</button>

                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </>
            ) : (
                <SiteSelection sites={sites} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default OtpInput;