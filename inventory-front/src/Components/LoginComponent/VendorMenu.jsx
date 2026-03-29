import React from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/LoginService';
import './VendorMenu.css';

const VendorMenu = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    });
  };

  return (
    <div className="vm-root">
      {/* Header with gradient */}
      <div className="vm-header">
        <div className="vm-header-content">
          <div className="vm-logo-badge">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#f97316" />
              <path d="M8 11h16M8 16h12M8 21h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          
          <div className="vm-header-text">
            <h1 className="vm-title">Vendor Portal</h1>
            <p className="vm-subtitle">Inventory Management System</p>
          </div>
          <div className="mm-user-info">
            <div className="mm-user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="mm-user-name">Vendor</span>
            <button className="mm-logout-btn" onClick={handleLogout}>
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zM2 4a2 2 0 012-2h7.586a1 1 0 01.707.293l4.414 4.414A1 1 0 0117 7.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm4 4a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vm-main">
        <div className="vm-container">
          
          {/* Welcome Banner */}
          <div className="vm-welcome-banner">
            <div className="vm-welcome-text">
              <h2>Welcome back, Vendor</h2>
              <p>Manage your profile and vendor details</p>
            </div>
            <div className="vm-stats-pill">
              <span>Vendor Portal Active</span>
              <span className="vm-status-dot"></span>
            </div>
          </div>

          {/* Simple Menu Card */}
          <div className="vm-menu-card">
            <div className="vm-menu-items">
              <button className="vm-menu-item" onClick={() => navigate('/user-details')}>
                <span>Show User Details</span>
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="vm-footer">
            <p>© 2026 InventoryPro - Vendor Portal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorMenu;