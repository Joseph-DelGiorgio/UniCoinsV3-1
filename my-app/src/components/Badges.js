import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import UNCollaboration from '../abis/UNCollaboration.json';
import './Badges.css';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants';

const Badges = ({ provider, volunteerAddress }) => {
  const [badges, setBadges] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    };
    
    const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    };
    
    const filteredBadges = badges.filter((badge) => {
      if (filter === "all") return true;
      if (filter === "bronze") return badge.hoursContributed < 50;
      if (filter === "silver") return badge.hoursContributed >= 50 && badge.hoursContributed < 100;
      if (filter === "gold") return badge.hoursContributed >= 100;
      if (filter === "humanitarian") return badge.badgeDescription.toLowerCase().includes("humanitarian");
      if (filter === "environmental") return badge.badgeDescription.toLowerCase().includes("environmental");
      if (filter === "educational") return badge.badgeDescription.toLowerCase().includes("educational");
      return false;
    });
    
    const searchedBadges = filteredBadges.filter((badge) => {
    return badge.badgeDescription.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    return (
    <div className="container">
    <h2>Badges</h2>
    <div className="filter-container">
    <label htmlFor="filter">Filter by: </label>
    <select id="filter" value={filter} onChange={handleFilterChange}>
    <option value="all">All</option>
    <option value="bronze">Bronze</option>
    <option value="silver">Silver</option>
    <option value="gold">Gold</option>
    <option value="humanitarian">Humanitarian</option>
    <option value="environmental">Environmental</option>
    <option value="educational">Educational</option>
    </select>
  </div>
  <div className="search-container">
    <input
      type="text"
      placeholder="Search badges..."
      value={searchTerm}
      onChange={handleSearchTermChange}
    />
  </div>
  {searchedBadges.length === 0 ? (
    <p>No badges found</p>
  ) : (
    <div className="badge-container">
      {searchedBadges.map((badge, index) => (
        <div key={index} className={`badge-card ${mapBadgeToColor(badge.hoursContributed)}`}>
          <img src="https://via.placeholder.com/100" alt="Badge" />
          <div className="badge-tooltip">
            Additional information about the {badge.badgeDescription} badge
          </div>
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


