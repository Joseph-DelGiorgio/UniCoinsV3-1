import React, { useState, useEffect } from "react";
import './Badges.css';

const Badges = ({ provider, volunteerAddress }) => {
  const [badges, setBadges] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const POAP_API_URL = 'https://api.poap.xyz/actions/scan/';
  const GITPOAP_EVENT_ID = ''; // Put your GitPOAP event ID here

  const Badges = ({ provider, volunteerAddress, badgeContract, poapBadges }) => {
    // ...
  };
  

  useEffect(() => {
    const fetchBadges = async () => {
      if (!provider || !volunteerAddress) return;

      // Fetch POAP badges
      try {
        const response = await fetch(`${POAP_API_URL}${volunteerAddress}?eventId=${GITPOAP_EVENT_ID}`);
        const poapBadges = await response.json();

        // Set fetched POAP badges
        setBadges(poapBadges);
      } catch (error) {
        console.error('Error fetching POAP badges:', error);
      }
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
<div className="poap-badge-container">
  {poapBadges.map((badge, index) => (
    <div className="poap-badge-card" key={index}>
      <img src={badge.imageUrl} alt="POAP badge" />
      <h3 className="poap-badge-name">{badge.name}</h3>
      <p className="poap-badge-description">{badge.description}</p>
      <p className="poap-badge-date">Event Date: {badge.eventDate}</p>
    </div>
  ))}
</div>

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
