import React, { useState } from "react";

const Staking = ({
  stakeTokens,
  unstakeTokens,
  balance,
  stakingPosition,
  createProposal,
}) => {
  const [stakeAmount, setStakeAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const [proposalData, setProposalData] = useState({
    title: "",
    description: "",
    requiredUnicoins: 0,
  });

  const handleStake = () => {
    stakeTokens(stakeAmount);
  };

  const handleUnstake = () => {
    unstakeTokens(unstakeAmount);
  };

  const handleProposal = () => {
    createProposal(proposalData);
  };

  return (
    <div>
      <h2>Staking</h2>
      <div>
        <input
          className="input-field"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
        <button onClick={handleStake}>Stake</button>
      </div>
      <div>
        <input
          className="input-field"
          type="number"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
        />
        <button onClick={handleUnstake}>Unstake</button>
      </div>
      <p>Your Staking Balance: {balance} Tokens</p>
      <p>Your Staking Position: {stakingPosition} Tokens</p>
      <h2>Create Proposal</h2>
      <div>
        <input
          className="input-field"
          type="text"
          placeholder="Title"
          value={proposalData.title}
          onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
        />
        <textarea
          className="input-field description-container"
          placeholder="Description"
          value={proposalData.description}
          onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Required UNicoins"
          value={proposalData.requiredUnicoins}
          onChange={(e) => setProposalData({ ...proposalData, requiredUnicoins: e.target.value })}
        />
        <button onClick={handleProposal}>Create Proposal</button>
      </div>
    </div>
    );
  };
  
  export default Staking;
