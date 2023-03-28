import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import UNCollaboration from '../abis/UNCollaboration.json';
import './Badges.css';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants';

const Badges = ({ provider, volunteerAddress }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      if (!provider || !volunteerAddress) return;
  
      const contractAddress = CONTRACT_ADDRESS;
        
      const contract = new ethers.Contract(contractAddress, UNCollaboration.abi, provider);
  
      const badgeAddresses = await contract.getProjectManagerAddresses();
  
      const fetchedBadges = [];
      for (const badgeAddress of badgeAddresses) {
        const [badgeDescription, hoursContributed] = await contract.getBadge(volunteerAddress, badgeAddress);
        fetchedBadges.push({ badgeDescription, hoursContributed });
      }
  
      setBadges(fetchedBadges);
    };
  
    fetchBadges();
  }, [provider, volunteerAddress]);

  const mapBadgeToColor = (hours) => {
    if (hours < 50) {
      return 'bronze';
    } else if (hours < 100) {
      return 'silver';
    } else {
      return 'gold';
    }
  };
  
  return (
    <div className="container">
      <h2>Badges</h2>
      {badges.length === 0 ? (
        <p>No badges found</p>
      ) : (
        <div className="badge-container">
          {badges.map((badge, index) => (
            <div key={index} className={`badge-card ${mapBadgeToColor(badge.hoursContributed)}`}>
              <img src="https://via.placeholder.com/100" alt="Badge" />
              <div className="badge-name">{badge.badgeDescription}</div>
              <div className="badge-description">Description: {badge.badgeDescription}</div>
              <div className="badge-hours">Hours Contributed: {badge.hoursContributed}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Badges;

