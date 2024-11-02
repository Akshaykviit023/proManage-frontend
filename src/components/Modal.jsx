import React, { useState, useEffect } from 'react';
import { createCard, setTask, updateCard } from '../services/task';
import Loader from './Loader';
const Modal = ({ show, onClose, initialData }) => {
    const [taskTitle, setTaskTitle] = useState(initialData?.title || ''); // Prefill title from initialData
  const [priority, setPriority] = useState(initialData?.priority || '');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [checklist, setChecklist] = useState(initialData?.checklist || []);
  const [dueDate, setDueDate] = useState(initialData?.dueDate || ''); // New state for date
  const [users, setUsers] = useState([]); // State to store users from MongoDB
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setLoading(true)
        try {
            if (show){
                setTask().then((fetchedUsers) => setUsers(fetchedUsers));
            } 
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        
    }, [show]);


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
            maxWidth: '80%',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        priorityButton: {
            borderRadius: '8px',
            padding: '0.15rem 0.5rem',
            cursor: 'pointer',
            border: '1px solid #E2E2E2',
            color: '#767575',
            fontSize: '14px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        label: {
            fontSize: '14px',
            fontWeight: 500,
        },
        input: {
            width: '95%',
            border: '1px solid #E2E2E2',
            color: 'black',
            fontSize: '14px',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            outline: 'none',
        },
        checklistItem: { display: 'flex', alignItems: 'center', margin: '0.5rem 0' },
        footer: { display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' },
        checkboxContainer : {
            width: '100%',
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

    if (!show) {
        return null;
    }
    
    const handleCheckboxChange = (index) => {
        setChecklist((prevChecklist) =>
            prevChecklist.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const handleChecklistChange = (index, value) => {
        setChecklist((prevChecklist) =>
            prevChecklist.map((item, i) =>
                i === index ? { ...item, task: value } : item
            )
        );
    };

    const handleAddNewTask = () => {
        setChecklist((prevChecklist) => [
            ...prevChecklist,
            { task: 'New Task', completed: false },
        ]);
    };

    const selectedCount = checklist.filter((item) => item.completed).length;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ taskTitle, priority, assignee, checklist, dueDate });

        const cardData = {
            title: taskTitle,
            priority,
            assignee, // This is a single user ID
            checklist, // This is an array of tasks
            dueDate
        };

        setLoading(true)

        try {
            if (initialData) {
                const response = await updateCard(initialData._id, cardData); // Update card using ID from initialData
                console.log(response);
            } else {
                const response = await createCard({ cardData }); // Create new card if no initialData
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
        
        
        // Reset form values
        setTaskTitle('');
        setPriority('');
        setAssignee('');
        setDueDate('');
        setChecklist([{ task: '', completed: false }]);
        onClose();
    };

    const handleUserSelect = (user) => {
        // Add the selected user to the assignees array
        if(assignee === user._id)
            setAssignee('');
        else
            setAssignee(user._id);
      };


    return (
        <div style={modalStyles.overlay}>
            {loading && <Loader />}
            <div style={modalStyles.modal}>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: '1.25rem'}}>
                    <label style={{...modalStyles.label, display: 'flex', flexDirection: 'column'}}>
                        <div>Title <span style={{ color: 'red'}}>*</span></div>
                        <input style={modalStyles.input} type="text" placeholder="Enter Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required/>
                    </label>
                    
                    <label style={{ display: "flex", alignItems: 'center', gap: "0.75rem", ...modalStyles.label}}>
                    <div>Select Priority <span style={{ color: 'red'}}>*</span></div>
                        <div style={{ display: "flex", gap: "0.75rem"}}>
                            <button
                                type="button"
                                style={{ ...modalStyles.priorityButton, backgroundColor: priority === 'high' ? '#EEECEC' : 'white' }}
                                onClick={() => setPriority('high')}
                            >
                                <div style={{ backgroundColor: '#FF2473', height: '8px', width: '8px', borderRadius: '999px' }} />
                                <div>HIGH PRIORITY</div>
                            </button>
                            <button
                                type="button"
                                style={{ ...modalStyles.priorityButton, backgroundColor: priority === 'moderate' ? '#EEECEC' : 'white' }}
                                onClick={() => setPriority('moderate')}
                            >
                                <div style={{ backgroundColor: '#18B0FF', height: '8px', width: '8px', borderRadius: '999px' }} />
                                <div>MODERATE PRIORITY</div>
                            </button>
                            <button
                                type="button"
                                style={{ ...modalStyles.priorityButton, backgroundColor: priority === 'low' ? '#EEECEC' : 'white' }}
                                onClick={() => setPriority('low')}
                            >
                                <div style={{ backgroundColor: '#63C05B', height: '8px', width: '8px', borderRadius: '999px' }} />
                                <div>LOW PRIORITY</div>
                            </button>
                        </div>
                    </label>

                    <label style={{ display: "flex", alignItems: 'center', gap: "0.75rem", ...modalStyles.label}}>
                        <div>Assign to</div>
                        <div style={{ position: 'relative', width: '100%'}}>
                            <div
                                type="button"
                                style={{
                                    ...modalStyles.input,
                                    
                                    backgroundColor: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                {assignee ? users.find(user => user._id === assignee)?.email : <div style={{ color: '#9B959F'}}>Add a assignee</div>}
                                <span style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                                    <img src="downArrow.svg" alt="" />
                                </span>
                            </div>
                            {isDropdownOpen && (
                                <ul style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '100%',
                                    maxHeight: '150px',
                                    overflowY: 'auto',
                                    backgroundColor: 'white',
                                    border: '1px solid #7E7A7A14',
                                    borderRadius: '4px',
                                    zIndex: 1000,
                                    listStyle: 'none',
                                    padding: '0',
                                    margin: '0',
                                }}>
                                    {users.map((user) => (
                                        <li
                                            key={user._id}
                                            style={{
                                                padding: '8px',
                                                cursor: 'pointer',
                                                backgroundColor: assignee === user._id ? '#f0f0f0' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                margin: '0.5rem 0.75rem'
                                            }}
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                alignItems: 'center'
                                            }}>
                                            <div style={{ backgroundColor: '#FFEBEB', height: '40px', width: '40px', borderRadius: '999px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{user.email.substr(0,2).toUpperCase()}</div>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: 500
                                            }}>{user.email}</div>
                                            </div>
                                            
                                            <div style={{
                                                border: '1px solid #E2E2E2',
                                                width: '154px',
                                                color: '#767575',
                                                borderRadius: '8px',
                                                backgroundColor: 'white',
                                                padding: '0.25rem 0',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textAlign: 'center'
                                            }}
                                            onClick={() => handleUserSelect(user)}
                                            >{assignee === user._id ? 'Remove' : 'Assign'}</div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        
                    </label>

                    <label style={{ ...modalStyles.label, display: 'flex', flexDirection: 'column' }}>
                        <div>Checklist ({selectedCount}/{checklist.length}) <span style={{ color: 'red' }}>*</span></div>
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {checklist.map((item, index) => (
                            <div key={index} style={modalStyles.checkboxContainer}>
                                <span
                                    style={{
                                        ...modalStyles.customCheckbox,
                                        ...(item.completed ? modalStyles.customCheckboxChecked : {}),
                                    }}
                                    onClick={() => handleCheckboxChange(index)}
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
                                <input
                                    type="text"
                                    placeholder="Task to be done"
                                    style={{ flex: 1, border: 'none', outline: 'none' }}
                                    value={item.task}
                                    onChange={(e) => handleChecklistChange(index, e.target.value)}
                                />
                                <div onClick={() => setChecklist(checklist.filter((task) => task.id !== item.id))}>
                                    <img src="deleteIcon.svg" alt="deleteIcon" />
                                </div>
                            </div>
                        ))}
                    </div>

          <div onClick={handleAddNewTask} style={{ marginTop: '1rem', color: '#767575', fontWeight: 500 }}>+ Add New</div>


                    <div style={modalStyles.footer}>
                        <input 
                        type="text" 
                        onFocus={(e) => (e.target.type = 'date')} 
                        onBlur={(e) => (e.target.type = 'text')} 
                        placeholder='Select Due Date' 
                        value={dueDate} // Set input value
                        onChange={(e) => setDueDate(e.target.value)} // Update dueDate on change
                        style={{ padding: '0.5rem 0', textAlign: 'center', backgroundColor: 'transparent', border: '1px solid #E2E2E2', color: '#707070', borderRadius: '8px', width: '162px', fontSize: '16px', fontWeight: 500 }} 
                        />
                            <div style={{ display: 'flex', gap: '0.75rem'}}>
                            <button type="button" onClick={onClose} style={{ padding: '0.5rem 0', backgroundColor: 'transparent', border: '1px solid #CF3636', color: '#CF3636', borderRadius: '8px', width: '162px', fontSize: '16px', fontWeight: 600 }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '0.5rem 0', backgroundColor: '#17A2B8', color: '#fff', border: 'none', borderRadius: '8px', width: '162px', fontSize: '16px', fontWeight: 600 }}>
                            Save
                        </button>
                            </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
