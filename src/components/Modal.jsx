import React, { useState, useEffect } from 'react';
import { createCard, setTask, updateCard } from '../services/task';
import Loader from './Loader';
import '../styles/Modal.css'; // Import the CSS file

const Modal = ({ show, onClose, initialData }) => {
  const [taskTitle, setTaskTitle] = useState(initialData?.title || ''); 
  const [priority, setPriority] = useState(initialData?.priority || '');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [checklist, setChecklist] = useState(initialData?.checklist || []);
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (show) {
      setTask()
        .then((fetchedUsers) => setUsers(fetchedUsers))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [show]);

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
    const cardData = { title: taskTitle, priority, assignee, checklist, dueDate };

    setLoading(true);
    try {
      if (initialData) {
        await updateCard(initialData._id, cardData);
      } else {
        await createCard({ cardData });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setTaskTitle('');
    setPriority('');
    setAssignee('');
    setDueDate('');
    setChecklist([{ task: '', completed: false }]);
    onClose();
  };

  const handleUserSelect = (user) => {
    setAssignee(assignee === user._id ? '' : user._id);
  };

  return (
    <div className="modal-overlay">
      {loading && <Loader />}
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="modal-form">
          <label className="modal-label">
            <div>Title <span className="required">*</span></div>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </label>
          
          <label className="modal-priority">
            <div>Select Priority <span className="required">*</span></div>
            <div className="priority-options">
              <button
                type="button"
                className={`priority-button ${priority === 'high' ? 'selected' : ''}`}
                onClick={() => setPriority('high')}
              >
                <div className="priority-indicator high" />
                HIGH PRIORITY
              </button>
              <button
                type="button"
                className={`priority-button ${priority === 'moderate' ? 'selected' : ''}`}
                onClick={() => setPriority('moderate')}
              >
                <div className="priority-indicator moderate" />
                MODERATE PRIORITY
              </button>
              <button
                type="button"
                className={`priority-button ${priority === 'low' ? 'selected' : ''}`}
                onClick={() => setPriority('low')}
              >
                <div className="priority-indicator low" />
                LOW PRIORITY
              </button>
            </div>
          </label>

          <label className="modal-assign">
            <div>Assign to</div>
            <div className="dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className="dropdown-input">
                {assignee ? users.find(user => user._id === assignee)?.email : 'Add an assignee'}
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {users.map((user) => (
                    <li key={user._id} className="dropdown-item" onClick={() => handleUserSelect(user)}>
                      <span>{user.email}</span>
                      <button type="button" className="assign-button">
                        {assignee === user._id ? 'Remove' : 'Assign'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </label>

          <label className="modal-label">
            <div>Checklist ({selectedCount}/{checklist.length}) <span className="required">*</span></div>
          </label>
          <div className="checklist">
            {checklist.map((item, index) => (
              <div key={index} className="checklist-item">
                <span className={`custom-checkbox ${item.completed ? 'checked' : ''}`} onClick={() => handleCheckboxChange(index)}></span>
                <input
                  type="text"
                  placeholder="Task to be done"
                  className="checklist-input"
                  value={item.task}
                  onChange={(e) => handleChecklistChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button type="button" className="add-task" onClick={handleAddNewTask}>+ Add New</button>

          <div className="modal-footer">
            <input
              type="text"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder="Select Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-picker"
            />
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
