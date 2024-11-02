import React, { useState } from 'react';
import Modal from './Modal';
import Card from './Card';
import '../styles/Category.css'; // Import the CSS file

const Category = ({ headName, cards }) => {
    const [showModal, setShowModal] = useState(false);
    const [checklistVisibility, setChecklistVisibility] = useState(cards.map(() => false));

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCollapseClick = () => {
        setChecklistVisibility(checklistVisibility.map(() => false)); 
    };

    const handleChecklistToggle = (index) => {
        setChecklistVisibility((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    return (
        <div className="category-container">
            <div className="category-header">
                <p className="category-title">{headName}</p>
                <div className="category-actions">
                    {headName === "To do" && (
                        <img 
                            src="addIcon.svg" 
                            alt="addIcon" 
                            className="action-btn" 
                            onClick={handleShowModal} 
                        />
                    )}
                    <img 
                        src="collapseIcon.svg" 
                        alt="collapse icon" 
                        className="action-btn" 
                        onClick={handleCollapseClick} 
                    />
                </div>
            </div>
            <div className="category-cards">
                {cards.map((card, index) => (
                    <Card 
                        key={card._id} 
                        cardDetails={card} 
                        headName={headName} 
                        isChecklistVisible={checklistVisibility[index]}
                        onChecklistToggle={() => handleChecklistToggle(index)} 
                    />
                ))}
            </div>

            <Modal show={showModal} onClose={handleCloseModal} />
        </div>
    );
};

export default Category;
