import React, { useState } from 'react';

const Dropdown = ({ setFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('This week');

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setFilter(option); // Pass the selected option to the Board component
    };

    return (
        <div style={styles.dropdown}>
            <div onClick={toggleDropdown} style={styles.dropdownHeader}>
                {selectedOption} <img src='dropdownArrow.svg' style={{ marginLeft: "10px", transform: isOpen ? "rotate(180deg)" : "" }} />
            </div>
            {isOpen && (
                <ul style={styles.dropdownList}>
                    <li style={styles.dropdownItem} onClick={() => handleOptionClick('Today')}>Today</li>
                    <li style={styles.dropdownItem} onClick={() => handleOptionClick('This week')}>This Week</li>
                    <li style={styles.dropdownItem} onClick={() => handleOptionClick('This month')}>This Month</li>
                </ul>
            )}
        </div>
    );
};

const styles = {
    dropdown: {
        position: 'relative',
        display: 'inline-block',
        fontFamily: 'Arial, sans-serif',
        cursor: 'pointer',
    },
    dropdownHeader: {
        padding: '10px 15px',
        fontSize: '16px',
        fontWeight: '400',
        color: '#000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownList: {
        position: 'absolute',
        top: '2rem',
        right: '1rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 22px 0px #7E7A7A40',
        padding: '10px 0',
        width: '150px',
        listStyleType: 'none',
    },
    dropdownItem: {
        padding: '10px 15px',
        fontSize: '16px',
        color: '#000',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    dropdownItemHover: {
        backgroundColor: '#f1f1f1',
    },
};

export default Dropdown;
