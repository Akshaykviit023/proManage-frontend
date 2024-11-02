import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPublicCard } from '../services/task';
import { formatDate } from '../utils/formatDate';
import ProManageLogo from '../components/ProManageLogo';
import '../styles/ViewCard.css';

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
        <div className="vc-container">
            <ProManageLogo />

            {cardDetails && (
                <div className="vc-card-wrapper">
                    <div className="vc-card-container">
                        <div className="vc-priority-indicator">
                            <div
                                className="vc-priority-dot"
                                style={{ backgroundColor: priorityColor(cardDetails.priority) }}
                            />
                            {cardDetails.priority.toUpperCase()} PRIORITY
                        </div>
                        <div className="vc-card-title">{cardDetails.title}</div>

                        <div className="vc-checklist-header">
                            <div>Checklist ({selectedCount}/{checklist.length})</div>
                        </div>

                        <div className="vc-checklist-container">
                            {checklist.map((item) => (
                                <div key={item._id} className="vc-checklist-item">
                                    <span
                                        className={`vc-custom-checkbox ${item.completed ? 'vc-checked' : ''}`}
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
                            <div className="vc-due-date-container">
                                <span>Due Date</span>
                                <div className="vc-due-date">
                                    {formatDate(cardDetails.dueDate)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewCard;