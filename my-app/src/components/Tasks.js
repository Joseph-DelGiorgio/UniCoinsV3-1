// Tasks.js
import React, { useState } from 'react';
import Task from './Task';
import Modal from 'react-modal';
import './Tasks.css';

const customStyles = {
  // ... (same as before)
};

Modal.setAppElement('#root');

const Tasks = ({
  tasks = [],
  addTask,
  completeTask,
  addProjectManager,
  addVolunteer,
  mintTokens,
  awardBadge,
}) => {
  // ... (same as before)

  const [projectManagerAddress, setProjectManagerAddress] = useState('');
  const [volunteerAddress, setVolunteerAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [hoursContributed, setHoursContributed] = useState('');

  // ... (same as before)

  const handleAddProjectManager = async () => {
    await addProjectManager(projectManagerAddress);
    setProjectManagerAddress('');
  };

  const handleAddVolunteer = async () => {
    await addVolunteer(volunteerAddress);
    setVolunteerAddress('');
  };

  const handleMintTokens = async () => {
    await mintTokens(volunteerAddress, mintAmount);
    setMintAmount('');
  };

  const handleAwardBadge = async () => {
    await awardBadge(volunteerAddress, badgeDescription, hoursContributed);
    setBadgeDescription('');
    setHoursContributed('');
  };

  return (
    <div className="container">
      {/* ... (same as before) */}

      <div className="project-manager-actions">
        <h3>Project Manager Actions</h3>
        <div className="form-group">
          <label htmlFor="projectManagerAddress">Add Project Manager:</label>
          <input
            type="text"
            id="projectManagerAddress"
            className="form-control"
            value={projectManagerAddress}
            onChange={(e) => setProjectManagerAddress(e.target.value)}
          />
          <button onClick={handleAddProjectManager}>Add Project Manager</button>
        </div>
        <div className="form-group">
          <label htmlFor="volunteerAddress">Add Volunteer:</label>
          <input
            type="text"
            id="volunteerAddress"
            className="form-control"
            value={volunteerAddress}
            onChange={(e) => setVolunteerAddress(e.target.value)}
          />
          <button onClick={handleAddVolunteer}>Add Volunteer</button>
        </div>
        <div className="form-group">
          <label htmlFor="mintAmount">Mint Tokens:</label>
          <input
            type="number"
            id="mintAmount"
            className="form-control"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <button onClick={handleMintTokens}>Mint Tokens</button>
        </div>
        <div className="form-group">
          <label htmlFor="badgeDescription">Award Badge:</label>
          <input
            type="text"
            id="badgeDescription"
            className="form-control"
            value={badgeDescription}
            onChange={(e) => setBadgeDescription(e.target.value)}
          />
          <input
            type="number"
            id="hoursContributed"
            className="form-control"
            value={hoursContributed}
            onChange={(e) => setHoursContributed(e.target.value)}
          />
          <button onClick={handleAwardBadge}>Award Badge</button>
        </div>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <Task key={index} index={index} task={task} completeTask={completeTask} />
        ))}
      </ul>
    </div>
  );
};

export default Tasks;



