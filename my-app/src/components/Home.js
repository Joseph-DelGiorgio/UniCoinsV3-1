import './Badges.css';
import homeImage from '../assets/homeImage.jpg';
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <h2>Welcome to our UN Collaboration Platform</h2>
      <img src={homeImage} alt="Home" className="home-image" />
      <div className="home-about">
        <h3>About the UN Collaboration Platform</h3>
        <div className="home-about-text">
          <p>
            The UN Collaboration Platform is a digital workspace designed to bring together professionals, organizations, and stakeholders from around the globe to collaborate on projects that address the United Nations Sustainable Development Goals (SDGs). Our platform offers a centralized space for users to share ideas, develop projects, and work together to create innovative solutions to the world's most pressing challenges. Join us in fostering an environment of collaboration, innovation, and impact to help shape a better future for all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;


