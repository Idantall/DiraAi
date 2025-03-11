// src/components/StatusBar.jsx
import React from 'react';
import './StatusBar.css';

const StatusBar = ({ moving, listingsCount }) => {
    return (
        <div className="status-bar" style={{ opacity: moving ? 0.5 : 1 }}>
            <p>{listingsCount} listings found</p>
        </div>
    );
};

export default StatusBar;
