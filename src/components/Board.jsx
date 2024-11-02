import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/currentTime';
import Dropdown from './Dropdown';
import Category from './Category';
import { fetchCards } from '../services/task';

const Board = () => {
    const [userName, setUserName] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [cards, setCards] = useState([]);
    const [filter, setFilter] = useState("This week");
    const [loading, setLoading] = useState(true); // New loading state

    const fetchCardDetails = async (filter) => {
        setLoading(true); // Set loading to true before fetch
        try {
            const response = await fetchCards({ filter });
            setCards(response);
        } catch (error) {
            console.error("Error fetching card details:", error);
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    }

    useEffect(() => {
        const name = localStorage.getItem('user'); 
        if (name) {
            setUserName(name); 
        }
        const today = new Date();
        setCurrentDate(formatDate(today));
        fetchCardDetails(filter); // Fetch initial data based on the default filter
    }, [filter]); // Re-fetch data whenever the filter changes

    const categories = ['backlog', 'to do', 'in progress', 'done'];

    const categorizedCards = categories.reduce((acc, category) => {
        acc[category] = cards.filter(card => card.category === category);
        return acc;
    }, {});

    return (
        <div style={{ maxWidth: "90%", height: "100vh", boxSizing: "border-box", overflow: "hidden" }}>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div className="spinner" style={{
                        width: '50px',
                        height: '50px',
                        border: '6px solid #ddd',
                        borderTop: '6px solid #17A2B8',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}></div>
                </div>
            )}
            
            <div style={{ padding: "0.25rem 1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: "22px", fontWeight: 600 }}>
                        Welcome! {userName ? userName[0].toUpperCase() + userName.slice(1) : "Guest"}
                    </h2>
                    <p style={{ color: "#707070", fontSize: "20px", fontWeight: 500 }}>
                        {currentDate}
                    </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "29px", fontWeight: 500 }}>
                        <p>Board</p>
                        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center", color: "#707070", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                            <img src="addPeopleLogo.svg" alt="noPic" />
                            <p>Add People</p>
                        </div>
                    </div>

                    <div>
                        <Dropdown setFilter={setFilter} /> {/* Pass setFilter to Dropdown */}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", overflowX: "auto", gap: "1rem", height: "77%" }}>
                {categories.map(category => (
                    <Category 
                        key={category} 
                        headName={category[0].toUpperCase() + category.slice(1)} // Capitalize first letter
                        cards={categorizedCards[category]} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;
