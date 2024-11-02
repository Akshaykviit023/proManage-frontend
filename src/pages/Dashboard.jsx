import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Board from '../components/Board';
import Analytics from '../components/Analytics';
import PersonalInfo from '../components/PersonalInfo';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("board"); 

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Navbar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      {activeComponent === "board" && <Board />}
      {activeComponent === "analytics" && <Analytics />}
      {activeComponent === "settings" && <PersonalInfo />}
    </div>
  );
};

export default Dashboard;