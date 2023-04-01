import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from your backend API or local data source
    const fetchProjects = async () => {
      const response = await fetch("your-api-url");
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

// ...
return (
  <div className="dashboard">
    <h2>Dashboard</h2>
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ProgressBar
            now={(project.currentUnicoins / project.requiredUnicoins) * 100}
            label={`${project.currentUnicoins}/${project.requiredUnicoins} UNicoins`}
          />
          <div className="project-overlay">
            <a href={`/projects/${project.id}`}>View Project</a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Dashboard;
