import React from 'react';
import Button from './Button';

const SmallModal = ({ show, onClose, onConfirm, title, primaryText, secondaryText }) => {
    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        button: {
            margin: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
        },
        confirmButton: {
            backgroundColor: '#CF3636',
            color: '#fff',
        },
        cancelButton: {
            backgroundColor: '#E2E2E2',
            color: '#000',
        },
    };

    if (!show) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '2rem'
                }}>{title}</div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
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

export default SmallModal;