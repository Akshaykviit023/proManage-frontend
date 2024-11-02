import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPublicCard } from '../services/task';
import { formatDate } from '../utils/formatDate';
import ProManageLogo from '../components/ProManageLogo';
import '../styles/ViewCard.css'
const ViewCard = () => {
    const { id } = useParams();
    const [cardDetails, setCardDetails] = useState(null);
    const [checklist, setChecklist] = useState([]);

    const priorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#FF2473';
            case 'moderate':
                return '#18B0FF';
            case 'low':
                return '#63C05B';
            default:
                return '#E2E2E2'; 
        }
    };

    const selectedCount = checklist.filter((item) => item.completed).length;

    useEffect(() => {
        const fetchCard = async () => {
            const response = await fetchPublicCard(id);
            setCardDetails(response.card);
            setChecklist(response.card.checklist);
        };

        fetchCard();
    }, []);

    return (
        <div className="container">
            <ProManageLogo />

            {cardDetails && (
                <div className="card-wrapper">
                    <div className="card-container">
                        <div className="priority-indicator">
                            <div
                                className="priority-dot"
                                style={{ backgroundColor: priorityColor(cardDetails.priority) }}
                            />
                            {cardDetails.priority.toUpperCase()} PRIORITY
                        </div>
                        <div className="card-title">{cardDetails.title}</div>

                        <div className="checklist-header">
                            <div>Checklist ({selectedCount}/{checklist.length})</div>
                        </div>

                        <div className="checklist-container">
                            {checklist.map((item) => (
                                <div key={item._id} className="checklist-item">
                                    <span
                                        className={`custom-checkbox ${item.completed ? 'checked' : ''}`}
                                    >
                                        {item.completed && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '10px',
                                                    height: '10px',
                                                    backgroundColor: 'white',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        )}
                                    </span>
                                    <div>{item.task}</div>
                                </div>
                ))}
            </div>

            {cardDetails.dueDate && 
            <div className='due-date-container'>
            <span>Due Date</span>
            <div className='due-date'>
                {formatDate(cardDetails.dueDate)}
            </div>
        </div>}
            
        </div>
    </div>
)}
        </div>
    );
};

export default ViewCard;
