import React, { useState, useEffect } from 'react';

const SiteSelection = ({ sites, onLogout }) => {
    const [selectedSite, setSelectedSite] = useState('');

    // Set default selected site when sites change
    useEffect(() => {
        if (sites.length > 0) {
            setSelectedSite(sites[0].name); // Automatically select the first site
        }
    }, [sites]);

    const handleAccessFolder = () => {
        const site = sites.find(site => site.name === selectedSite);
        if (site) {
            window.open(site.url, '_blank'); // Open selected site URL in a new tab
        } else {
            alert('Please select a site.'); // Alert if no site is selected
        }
    };

    return (
        <div className="site-selection">
            <h2>Select a Site</h2>
            {sites.length > 0 ? (
                <>
                    <select 
                        value={selectedSite} 
                        onChange={(e) => setSelectedSite(e.target.value)} 
                        className="site-dropdown"
                    >
                        {sites.map((site) => (
                            <option key={site.name} value={site.name}>
                                {site.name}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={handleAccessFolder} 
                        className="access-folder-button" 
                        disabled={!selectedSite}
                    >
                        Access Folder
                    </button>
                    <button onClick={onLogout} className="logout-button">
                        Logout
                    </button>
                </>
            ) : (
                <p>No sites available.</p> // Message when no sites are available
            )}
        </div>
    );
};

export default SiteSelection;