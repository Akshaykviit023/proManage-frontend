import React, { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { changeCategory, deleteCard, updateChecklistItemStatus } from '../services/task';
import Modal from './Modal';
import SmallModal from './SmallModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Dashboard.css'
import Loader from './Loader';


const Card = ({ cardDetails, headName, isChecklistVisible, onChecklistToggle }) => {
    const [checklist, setChecklist] = useState(cardDetails.checklist || []); 

    const categoryNames = ['backlog', 'to do', 'in progress', 'done'];
    const filteredCategories = categoryNames.filter(category => category !== headName.toLowerCase()); 
    const [showOptions, setShowOptions] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [loading, setLoading] = useState(false);




    const modalStyles = {
        checklistItem: { display: 'flex', alignItems: 'center', margin: '0.5rem 0' },
        checkboxContainer: {
            width: '246px',
            border: '1px solid #E2E2E2',
            borderRadius: '12px',
            color: '#9B959F',
            fontSize: '14px',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
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
            cursor: 'pointer',
        },
        customCheckboxChecked: {
            backgroundColor: '#17A2B8',
            border: 'none',
            width: '18px',
            height: '18px',
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

    const handleCheckboxChange = async (id, completed) => {
        setLoading(true);
        try {
            await updateChecklistItemStatus(cardDetails._id, id, !completed);

            setChecklist((prevChecklist) =>
                prevChecklist.map((item) =>
                    item._id === id ? { ...item, completed: !item.completed } : item
                )
            );
        } catch (error) {
            console.error("Error updating checklist item:", error);
            alert("Failed to update checklist item.");
        }
        finally {
            setLoading(false)
        }
    };

    const handleChangeCategory = async (category, cardId) => {
        setLoading(true)
        try {
            const response = await changeCategory(category, cardId);
            console.log("Category changed successfully:", response);
        } catch (error) {
            console.error("Error changing category:", error.message);
            alert("Failed to change category.");
        }
        finally {
            setLoading(false)
        }
    }

    const handleOptionClick = () => {
        setShowOptions((prev) => !prev); 
    };

    const handleDelete = () => {
        setShowOptions(false);
        setShowDeleteModal(true); 
    };

    const confirmDelete = async (cardId) => {
        setLoading(true);
        try {
            const response = await deleteCard(cardId); 
            console.log("Card deleted:", response);
            setShowDeleteModal(false); 
        } catch (error) {
            console.error("Error deleting card:", error);
        }
        finally{
            setLoading(false)
        }
    };
    const handleEditClick = () => {
        setShowOptions(false);
        setEditModalOpen(true); 
      };

      const handleShareClick = (cardId) => {
        setShowOptions(false);
        navigator.clipboard.writeText(`https://promanage-pink.vercel.app/cards/${cardId}`);
        toast.success("Link Copied", {
            className: 'custom-toast',
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            closeButton: false,
            icon: false
        });
      };

    return (
        <div style={{ backgroundColor: "white", borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            {loading && <Loader />}
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative'
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
                <img src="optionsLogo.svg" alt="Options" onClick={handleOptionClick} style={{ cursor: 'pointer'}}/>
                {showOptions && (
                    <div style={{
                        position: 'absolute',
                        width: '120px',
                        top: '1rem',
                        right: '0',
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        zIndex: 10,
                        fontSize: '14px',
                        fontWeight: 500,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{cursor: 'pointer' }} onClick={handleEditClick}>Edit</div>
                            <div style={{cursor: 'pointer' }} onClick={() => handleShareClick(cardDetails._id)}>Share</div>
                            <div style={{cursor: 'pointer', color: '#CF3636' }} onClick={() => handleDelete(cardDetails._id)}>Delete</div>
                        </div>
                        
                    </div>
                )}
            </div>
            <div style={{
                fontSize: '18px',
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
                <div style={{
                    backgroundColor: '#EEECEC',
                    borderRadius: '3px',
                    height: '24px',
                    width: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transform: isChecklistVisible && 'rotate(180deg)'
                }}
                onClick={onChecklistToggle}
                >
                    <img src="downArrow.svg" alt="downArrow" />
                </div>
            </div>
            {isChecklistVisible && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {checklist.map((item) => (
                        <div key={item._id} style={modalStyles.checkboxContainer}>
                            <span
                                style={{
                                    ...modalStyles.customCheckbox,
                                    ...(item.completed ? modalStyles.customCheckboxChecked : {}),
                                }}
                                onClick={() => handleCheckboxChange(item._id, item.completed)}
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
            )}


            <div style={{
                fontSize: '8px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1rem'
            }}>
                {cardDetails.dueDate && <div style={{
                    padding: '0.3rem 0.5rem',
                    backgroundColor: cardDetails.category == 'done' ? '#63C05B' : cardDetails.priority == 'high' ? '#CF3636' : '#DBDBDB',
                    borderRadius: '8px',
                    color: cardDetails.priority == 'high' ? '#FFFFFF' : '#5A5A5A'
                }}>{formatDate(cardDetails.dueDate)}</div>}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {filteredCategories.map((category, index) => (
                        <div key={index} style={{
                            padding: '0.3rem 0.6rem',
                            backgroundColor: '#F0F0F0',
                            borderRadius: '8px',
                            color: '#767575',
                            fontSize: '8px',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleChangeCategory(category, cardDetails._id)}
                        >
                            {category.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            {editModalOpen && (
        <Modal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={cardDetails} // Pass card details as initial data
        />
      )}

{showDeleteModal && (
                <SmallModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    initialData={cardDetails}
                    onConfirm={() => confirmDelete(cardDetails._id)}
                    title='Are you sure you want to Delete?'
                    primaryText='Yes, Delete'
                    secondaryText='Cancel'
                />
            )}

<ToastContainer />
        </div>
    );
}

export default Card;