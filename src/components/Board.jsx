import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/currentTime';
import Dropdown from './Dropdown';
import Category from './Category';
import { fetchCards } from '../services/task';
import Loader from './Loader';
import '../styles/Board.css'; 

const Board = () => {
    const [userName, setUserName] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [cards, setCards] = useState([]);
    const [filter, setFilter] = useState("This week");
    const [loading, setLoading] = useState(true);

    const fetchCardDetails = async (filter) => {
        setLoading(true);
        try {
            const response = await fetchCards({ filter });
            setCards(response);
        } catch (error) {
            console.error("Error fetching card details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const name = localStorage.getItem('user');
        if (name) {
            setUserName(name);
        }
        const today = new Date();
        setCurrentDate(formatDate(today));
        fetchCardDetails(filter);
    }, [filter]);

    const categories = ['backlog', 'to do', 'in progress', 'done'];

    const categorizedCards = categories.reduce((acc, category) => {
        acc[category] = cards.filter(card => card.category === category);
        return acc;
    }, {});

    return (
        <div className="board-container">
            {loading && <Loader />}

            <div className="board-header">
                <div className="board-welcome">
                    <h2 className="board-welcome-text">
                        Welcome! {userName ? userName[0].toUpperCase() + userName.slice(1) : "Guest"}
                    </h2>
                    <p className="board-date">{currentDate}</p>
                </div>

                <div className="board-main-header">
                    <div className="board-title">
                        <p>Board</p>
                        <div className="board-add-people">
                            <img src="addPeopleLogo.svg" alt="noPic" />
                            <p>Add People</p>
                        </div>
                    </div>
                    <Dropdown setFilter={setFilter} />
                </div>
            </div>

            <div className="board-categories">
                {categories.map(category => (
                    <Category 
                        key={category} 
                        headName={category[0].toUpperCase() + category.slice(1)} 
                        cards={categorizedCards[category]} 
                    />
                ))}
            </div>
        </div>
    );
}

export default Board;
