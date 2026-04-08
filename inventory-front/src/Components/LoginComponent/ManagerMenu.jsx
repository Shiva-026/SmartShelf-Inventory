import React from "react";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Services/LoginService';
import './ManagerMenu.css';  

const ManagerMenu = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      navigate('/');
    });
  };

  // Navigation handlers
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="mm-root">
      {/* Header with gradient */}
      <div className="mm-header">
        <div className="mm-header-content">
          <div className="mm-logo-badge">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0d9488" />
              <path d="M8 11h16M8 16h12M8 21h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="mm-header-text">
            <h1 className="mm-title">Manager Dashboard</h1>
            <p className="mm-subtitle">Inventory Management System</p>
          </div>
          <div className="mm-user-info">
            <div className="mm-user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="mm-user-name">Manager</span>
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
      <div className="mm-main">
        <div className="mm-container">
          
          {/* Welcome Banner */}
          <div className="mm-welcome-banner">
            <div className="mm-welcome-text">
              <h2>Welcome back, Manager</h2>
              <p>Monitor inventory, track products, and manage daily operations.</p>
            </div>
            <div className="mm-stats-pill">
              <span>Store Active</span>
              <span className="mm-status-dot"></span>
            </div>
          </div>

         

          {/* Menu Sections */}
          <div className="mm-menu-grid">
            {/* SKU Management */}
            <div className="mm-menu-section">
              <div className="mm-section-header">
                <div className="mm-section-icon teal-bg">
                  <svg viewBox="0 0 20 20" fill="white">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <h3>SKU Management</h3>
              </div>
              <div className="mm-menu-items">
                <button className="mm-menu-item" onClick={() => navigateTo('/sku-repo')}>
                  <span>View SKU List</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Management */}
            <div className="mm-menu-section">
              <div className="mm-section-header">
                <div className="mm-section-icon emerald-bg">
                  <svg viewBox="0 0 20 20" fill="white">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                </div>
                <h3>Product Management</h3>
              </div>
              <div className="mm-menu-items">
                <button className="mm-menu-item" onClick={() => navigateTo('/product-repo')}>
                  <span>Product List</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="mm-menu-item" onClick={() => navigateTo('/product-pie')}>
                  <span>Product Analysis</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Transaction Reports */}
            <div className="mm-menu-section">
              <div className="mm-section-header">
                <div className="mm-section-icon green-bg">
                  <svg viewBox="0 0 20 20" fill="white">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3>Transaction Reports</h3>
              </div>
              <div className="mm-menu-items">
                <button className="mm-menu-item" onClick={() => navigateTo('/trans-repo/OUT')}>
                  <span>Outbound Transactions</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="mm-menu-item" onClick={() => navigateTo('/trans-repo/IN')}>
                  <span>Inbound Transactions</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Team Management */}
            <div className="mm-menu-section">
              <div className="mm-section-header">
                <div className="mm-section-icon cyan-bg">
                  <svg viewBox="0 0 20 20" fill="white">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3>Team Management</h3>
              </div>
              <div className="mm-menu-items">
                <button className="mm-menu-item" onClick={() => navigateTo('/users')}>
                  <span>View Team Members</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          

          {/* Footer */}
          <div className="mm-footer">
            <p>© 2026 InventoryPro - Manager Dashboard. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerMenu;