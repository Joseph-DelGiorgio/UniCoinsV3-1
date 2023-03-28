import React, { useState } from 'react';
import './Staking.css';

const Staking = ({ stakeTokens, unstakeTokens, balance, stakingPosition }) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  const handleStakeTokens = async () => {
    await stakeTokens(stakeAmount);
    setStakeAmount('');
  };

  const handleUnstakeTokens = async () => {
    await unstakeTokens(unstakeAmount);
    setUnstakeAmount('');
  };

  return (
    <div className="staking-container">
      <h2>Staking</h2>
      <div className="balance">
        <h3>Your Balance: {balance} UNicoins</h3>
        <h4>Staked: {stakingPosition} UNicoins</h4>
      </div>
      <div className="form-group">
        <label htmlFor="stakeAmount">Stake Tokens:</label>
        <input
          type="number"
          id="stakeAmount"
          className="form-control"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
        <button onClick={handleStakeTokens}>Stake Tokens</button>
      </div>
      <div className="form-group">
        <label htmlFor="unstakeAmount">Unstake Tokens:</label>
        <input
          type="number"
          id="unstakeAmount"
          className="form-control"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
        />
        <button onClick={handleUnstakeTokens}>Unstake Tokens</button>
      </div>
    </div>
  );
};

export default Staking;
