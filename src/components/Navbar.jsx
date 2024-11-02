import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import { useNavigate } from "react-router-dom";
import '../styles/Navbar.css'; 

const Navbar = ({ setActiveComponent, activeComponent }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = (component) => ({
    backgroundColor: activeComponent === component ? '#4391ED1A' : 'transparent',
  });

  const confirmLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setShowDeleteModal(false);
      navigate('/');
    } catch (error) {
      console.log('Could not logout');
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="proManage_logo.svg" alt="" height={24} width={24} />
        Pro Manage
      </div>

      <div className="navbar-menu">
        <div
          onClick={() => setActiveComponent("board")}
          style={buttonStyle("board")}
          className="navbar-button"
        >
          <img src="boardLogo.svg" alt="" />
          Board
        </div>
        <div
          onClick={() => setActiveComponent("analytics")}
          style={buttonStyle("analytics")}
          className="navbar-button"
        >
          <img src="analyticsLogo.svg" alt="" />
          Analytics
        </div>
        <div
          onClick={() => setActiveComponent("settings")}
          style={buttonStyle("settings")}
          className="navbar-button"
        >
          <img src="settingsLogo.svg" alt="" />
          Settings
        </div>
      </div>

      <div
        className="navbar-logout"
        onClick={() => setShowDeleteModal(true)}
      >
        <img src="logoutLogo.svg" alt="" />
        Logout
      </div>

      {showDeleteModal && (
        <ConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmLogout}
          title="Are you sure you want to Logout?"
          primaryText="Yes, Logout"
          secondaryText="Cancel"
        />
      )}
    </div>
  );
};

export default Navbar;
