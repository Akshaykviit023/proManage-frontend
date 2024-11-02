import React, {useState} from 'react';
import SmallModal from './SmallModal';
import { useNavigate } from "react-router-dom";

const Navbar = ({ setActiveComponent, activeComponent }) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = (component) => ({
    backgroundColor: activeComponent === component ? '#4391ED1A' : 'transparent',
    padding: '0.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  });


  const confirmLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setShowDeleteModal(false);
      navigate('/')
    } catch (error) {
      console.log('Could not logout')
    }
    
  }

  return (
    <div style={{
      minWidth: "224px",
      borderRight: "1px solid #EDF5FE",
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      fontSize: '16px',
      fontWeight: 500,
      height: '100vh', 
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        padding: '0 2rem',
        marginTop: '1.5rem',
        marginBottom: '1rem',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 700,
        gap: '0.75rem'
      }}>
        <img src="proManage_logo.svg" alt="" height={24} width={24} />Pro Manage
      </div>

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div onClick={() => setActiveComponent("board")} style={buttonStyle("board")}>
          <img src="boardLogo.svg" alt="" />
          Board
        </div>
        <div onClick={() => setActiveComponent("analytics")} style={buttonStyle("analytics")}>
          <img src="analyticsLogo.svg" alt="" />
          Analytics
        </div>
        <div onClick={() => setActiveComponent("settings")} style={buttonStyle("settings")}>
          <img src="settingsLogo.svg" alt="" />
          Settings
        </div>
      </div>

      <div style={{
        padding: '0.5rem 2rem',
        color: '#CF3636',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '0.75rem',
        cursor: 'pointer'
      }}
      onClick={() => setShowDeleteModal(true)}
      >

        <img src="logoutLogo.svg" alt="" />
        Logout
      </div>

      {showDeleteModal && (
                <SmallModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={() => confirmLogout()}
                    title='Are you sure you want to Logout?'
                    primaryText='Yes, Logout'
                    secondaryText='Cancel'
                />
            )}
    </div>
  );
};

export default Navbar;
