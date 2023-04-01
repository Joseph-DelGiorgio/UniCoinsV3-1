import React, { useState, useEffect } from 'react';

const Projects = ({ web3, contract }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (contract) {
        const projectCount = await contract.methods.getProjectCount().call();
        const fetchedProjects = [];

        for (let i = 0; i < projectCount; i++) {
          const project = await contract.methods.projects(i).call();
          fetchedProjects.push(project);
        }

        setProjects(fetchedProjects);
      }
    };

    fetchProjects();
  }, [contract]);

  return (
    <div className="container">
      <h1>Projects</h1>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Budget: {web3.utils.fromWei(project.budget, 'ether')} ETH</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;


