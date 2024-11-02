
import React from 'react';
import Button from './Button';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm, title, primaryText, secondaryText }) => {
    if (!show) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-title">{title}</div>
                <div className="button-container">
                    <Button
                        btnName={primaryText}
                        bgColor="#17A2B8"
                        color="white"
                        borderRadius="12px"
                        width="300px"
                        fontSize="16px"
                        padding="0.5rem 0"
                        fontWeight={600}
                        action={onConfirm}
                    />
                    <Button
                        btnName={secondaryText}
                        bgColor="white"
                        color="#CF3636"
                        isBorder={true}
                        borderRadius="12px"
                        fontSize="16px"
                        padding="0.5rem 0"
                        fontWeight={600}
                        width="300px"
                        action={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;