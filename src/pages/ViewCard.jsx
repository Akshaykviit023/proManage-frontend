import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPublicCard } from '../services/task';
import { formatDate } from '../utils/formatDate';

const ViewCard = () => {
    const { id } = useParams();
    const [cardDetails, setCardDetails] = useState(null);
    const [checklist, setChecklist] = useState([]);

    const modalStyles = {
        checklistItem: { display: 'flex', alignItems: 'center', margin: '0.5rem 0' },
        checkboxContainer: {
            maxWidth: '588px',
            border: '1px solid #E2E2E2',
            borderRadius: '12px',
            color: 'black',
            fontSize: '16px',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 400,
        },
        customCheckbox: {
            width: '14px',
            height: '14px',
            appearance: 'none',
            border: '2px solid #E2E2E2',
            backgroundColor: 'white',
            borderRadius: '6px',
            display: 'inline-block',
            position: 'relative',
        },
        customCheckboxChecked: {
            backgroundColor: '#17A2B8',
            border: 'none',
            width: '18px',
            height: '18px',
        },
        dueDateContainer: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            fontSize: '15px',
            fontWeight: 500,
            marginTop: '1rem',
        },
        dueDate: {
            backgroundColor: '#CF3636',
            color: '#FFFFFF',
            fontSize: '14px',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: 500,
        },
    };

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
        <div style={{
            height: '100vh',
            width: '100vw',
            padding: '0 2rem',
            boxSizing: 'border-box',
        }}>
            <div style={{
                display: 'flex',
                marginTop: '1.5rem',
                marginBottom: '1rem',
                alignItems: 'center',
                padding: '1rem 0',
                fontSize: '16px',
                fontWeight: 700,
                gap: '0.75rem',
            }}>
                <img src="../../public/proManage_logo.svg" alt="proManage" height={24} width={24} />
                Pro Manage
            </div>

            {cardDetails && (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }}>
        <div style={{
            maxWidth: '654px',  // Set a max width to keep it centered and contained
            width: '100%',
            padding: '2rem',
            boxSizing: 'border-box',
            border: '2px solid #EDF5FE',
            borderRadius: '12px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '8px', fontWeight: 500, color: '#707070' }}>
                <div style={{
                    width: '9px',
                    height: '9px',
                    backgroundColor: priorityColor(cardDetails.priority),
                    borderRadius: '999px',
                }} />
                {(cardDetails.priority).toUpperCase()} PRIORITY
            </div>
            <div style={{
                fontSize: '22px',
                fontWeight: 500,
                marginTop: '0.25rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}>{cardDetails.title}</div>

            <div style={{
                fontSize: '14px',
                fontWeight: 500,
                margin: '0.75rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div>Checklist ({selectedCount}/{checklist.length})</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '480px', overflowY: 'auto' }}>
                {checklist.map((item) => (
                    <div key={item._id} style={modalStyles.checkboxContainer}>
                        <span
                            style={{
                                ...modalStyles.customCheckbox,
                                ...(item.completed ? modalStyles.customCheckboxChecked : {}),
                            }}
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
            <div style={modalStyles.dueDateContainer}>
            <span>Due Date</span>
            <div style={modalStyles.dueDate}>
                {formatDate(cardDetails.dueDate)}
            </div>
        </div>}
            
        </div>
    </div>
)}


            <style jsx>{`
                @media (max-width: 768px) {
                    div[style*="padding: '2rem 1rem']"] {
                        padding: 1rem;
                    }
                    div[style*="fontSize: '22px'"] {
                        font-size: 18px;
                    }
                    div[style*="fontSize: '14px'"] {
                        font-size: 12px;
                    }
                    div[style*="gap: '0.75rem'"] {
                        gap: 0.5rem;
                    }
                    div[style*="borderRadius: '12px'"] {
                        borderRadius: 20px;
                    }
                    
                }

                @media (max-width: 480px) {
                    div[style*="padding: '2rem 1rem'"] {
                        padding: 1rem 0.5rem;
                    }
                    div[style*="fontSize: '22px'"] {
                        font-size: 16px;
                    }
                    div[style*="fontSize: '14px'"] {
                        font-size: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ViewCard;
