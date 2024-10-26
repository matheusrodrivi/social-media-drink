import React from 'react';
import './UserProfile.css';

const UserProfile = ({ userName = "John Doe", onLogout = () => console.log("Logout clicked") }) => {
  return (
    <div className="profile-container">
      <div className="profile-square">
        <div className="avatar">
          <img src="/placeholder.svg?height=80&width=80" alt={userName} />
          <div className="avatar-fallback">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        </div>
        <h2 className="user-name">{userName}</h2>
        <p className="user-title">User Profile</p>
        <button className="logout-button" onClick={onLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;