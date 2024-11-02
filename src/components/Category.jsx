import React, { useState } from 'react';
import Modal from './Modal';
import Card from './Card';

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
        setChecklistVisibility(checklistVisibility.map(() => false)); // Close all checklists
    };

    const handleChecklistToggle = (index) => {
        setChecklistVisibility((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index]; // Toggle the specific card's checklist
            return newVisibility;
        });
    };

    return (
        <div style={{ minWidth: "312px", height: "97%", backgroundColor: "#EEF2F5", borderRadius: "10px", padding: "0.5rem 1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: "16px", fontWeight: 500 }}>{headName}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    {headName === "To do" && <img src="addIcon.svg" alt="addIcon" style={styles.actionBtn} onClick={handleShowModal} />}
                    <img src="collapseIcon.svg" alt="collapse icon" style={styles.actionBtn} onClick={handleCollapseClick} />
                </div>
            </div>
            <div style={{
                overflow: 'scroll',
                maxHeight: '90%'
            }}>
                {cards.map((card, index) => (
                    <Card 
                        key={card._id} 
                        cardDetails={card} 
                        headName={headName} 
                        isChecklistVisible={checklistVisibility[index]} // Pass checklist visibility state
                        onChecklistToggle={() => handleChecklistToggle(index)} // Pass toggle function
                    />
                ))}
            </div>

            <Modal show={showModal} onClose={handleCloseModal} />
        </div>
    );
}

const styles = {
    actionBtn: {
        cursor: 'pointer',
    }
}

export default Category;
