
import React, { useState } from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({ setFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('This week');

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        setFilter(option);
    };

    return (
        <div className="dropdown">
            <div onClick={toggleDropdown} className="dropdown-header">
                {selectedOption} 
                <img 
                    src="dropdownArrow.svg" 
                    className={`dropdown-arrow ${isOpen ? 'dropdown-arrow-open' : ''}`} 
                    alt="Arrow Icon"
                />
            </div>
            {isOpen && (
                <ul className="dropdown-list">
                    <li className="dropdown-item" onClick={() => handleOptionClick('Today')}>Today</li>
                    <li className="dropdown-item" onClick={() => handleOptionClick('This week')}>This Week</li>
                    <li className="dropdown-item" onClick={() => handleOptionClick('This month')}>This Month</li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;