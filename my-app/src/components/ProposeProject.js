import React, { useState } from 'react';
import './ProposeProject.css';

const ProposeProject = ({ proposeProject, balance }) => {
  const [projectDescription, setProjectDescription] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');

  const handleProposeProject = async () => {
    await proposeProject(projectDescription, stakingAmount);
    setProjectDescription('');
    setStakingAmount('');
  };

  return (
    <div className="propose-project-container">
      <h2>Propose Project</h2>
      <div className="balance">
        <h3>Your Balance: {balance} UNicoins</h3>
      </div>
      <div className="form-group">
        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          className="form-control"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="stakingAmount">Staking Amount:</label>
        <input
          type="number"
          id="stakingAmount"
          className="form-control"
          value={stakingAmount}
          onChange={(e) => setStakingAmount(e.target.value)}
        />
      </div>
      <button onClick={handleProposeProject}>Propose Project</button>
    </div>
  );
};

export default ProposeProject;
