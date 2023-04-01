import React, { useState } from 'react';

const ProposeProject = ({ web3, account, contract }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (contract) {
      await contract.methods
        .proposeProject(title, description, web3.utils.toWei(budget, 'ether'))
        .send({ from: account });
    }

    setTitle('');
    setDescription('');
    setBudget('');
  };

  return (
    <div className="container">
      <h1>Propose a New Project</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label htmlFor="budget">Budget (ETH):</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProposeProject;
