import React, { useState } from 'react';
import { formatDate } from '../utils/formatDate';
import { changeCategory, deleteCard, updateChecklistItemStatus } from '../services/task';
import Modal from './Modal';
import ConfirmModal from './ConfirmModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Dashboard.css';
import '../styles/Card.css';
import Loader from './Loader';

const Card = ({ cardDetails, headName, isChecklistVisible, onChecklistToggle }) => {
    const [checklist, setChecklist] = useState(cardDetails.checklist || []);
    const categoryNames = ['backlog', 'to do', 'in progress', 'done'];
    const filteredCategories = categoryNames.filter(category => category !== headName.toLowerCase());
    const [showOptions, setShowOptions] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

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
        } finally {
            setLoading(false);
        }
    };

    const handleChangeCategory = async (category, cardId) => {
        setLoading(true);
        try {
            const response = await changeCategory(category, cardId);
            console.log("Category changed successfully:", response);
        } catch (error) {
            console.error("Error changing category:", error.message);
            alert("Failed to change category.");
        } finally {
            setLoading(false);
        }
    };

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
        } finally {
            setLoading(false);
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
        <div className="card-container">
            {loading && <Loader />}
            <div className="card-header">
                <div className="card-priority">
                    <div className="priority-dot" style={{ backgroundColor: priorityColor(cardDetails.priority) }} />
                    {(cardDetails.priority).toUpperCase()} PRIORITY
                </div>
                <img src="optionsLogo.svg" alt="Options" onClick={handleOptionClick} className="options-icon" />
                {showOptions && (
                    <div className="options-menu">
                        <div className="options-item" onClick={handleEditClick}>Edit</div>
                        <div className="options-item" onClick={() => handleShareClick(cardDetails._id)}>Share</div>
                        <div className="options-item delete-option" onClick={() => handleDelete(cardDetails._id)}>Delete</div>
                    </div>
                )}
            </div>
            <div className="card-title">{cardDetails.title}</div>
            <div className="checklist-header">
                <div>Checklist ({selectedCount}/{checklist.length})</div>
                <div
                    className={`arrow-icon-container ${isChecklistVisible ? 'arrow-rotated' : ''}`}
                    onClick={onChecklistToggle}
                >
                    <img src="downArrow.svg" alt="downArrow" />
                </div>
            </div>
            {isChecklistVisible && (
                <div className="checklist-container">
                    {checklist.map((item) => (
                        <div key={item._id} className="checklist-item">
                            <span
                                className={`custom-checkbox ${item.completed ? 'custom-checkbox-checked' : ''}`}
                                onClick={() => handleCheckboxChange(item._id, item.completed)}
                            >
                                {item.completed && <span className="checkbox-inner" />}
                            </span>
                            <div>{item.task}</div>
                        </div>
                    ))}
                </div>
            )}
            <div className="card-footer">
                {cardDetails.dueDate && (
                    <div
                        className="due-date"
                        style={{
                            backgroundColor: cardDetails.category === 'done' ? '#63C05B' : cardDetails.priority === 'high' ? '#CF3636' : '#DBDBDB',
                            color: cardDetails.priority === 'high' ? '#FFFFFF' : '#5A5A5A'
                        }}
                    >
                        {formatDate(cardDetails.dueDate)}
                    </div>
                )}
                <div className='category-list'>
                    {filteredCategories.map((category, index) => (
                        <div key={index} className="category-button" onClick={() => handleChangeCategory(category, cardDetails._id)}>
                            {category.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            {editModalOpen && (
                <Modal
                    show={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    initialData={cardDetails}
                />
            )}
            {showDeleteModal && (
                <ConfirmModal
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
