import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Container, Table, Form, Button } from 'react-bootstrap';
import './Projects.css';

function Projects() {
  const { web3, contract, account } = useWeb3();
  const [proposals, setProposals] = useState([]);
  const [projectDescription, setProjectDescription] = useState('');
  const [stakingAmount, setStakingAmount] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      if (!contract) return;

      try {
        const proposalCount = await contract.methods.nextProposalId().call();
        const fetchedProposals = await Promise.all(
          Array.from({ length: proposalCount }, (_, i) =>
            contract.methods.projectProposals(i).call()
          )
        );
        setProposals(fetchedProposals);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [contract]);

  const proposeProject = async (e) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      await contract.methods
        .proposeProject(projectDescription, web3.utils.toWei(stakingAmount, 'ether'))
        .send({ from: account });
      window.location.reload();
    } catch (error) {
      console.error('Error proposing project:', error);
    }
  };

  const renderStatus = (proposal) => {
    const status = !proposal.validated ? 'pending' : proposal.deliverablesMet ? 'deliverables-met' : 'not-met';
    const statusText = status === 'pending' ? 'Pending Validation' : status === 'deliverables-met' ? 'Deliverables Met' : 'Deliverables Not Met';
    return <span className={`status ${status}`}>{statusText}</span>;
  };

  return (
    <Container>
      <h1>Projects</h1>
      <h2>Propose a Project</h2>
      <Form onSubmit={proposeProject}>
      <Form.Group className="center-input">
  <Form.Label>Project Description</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter project description"
    value={projectDescription}
    onChange={(e) => setProjectDescription(e.target.value)}
  />
</Form.Group>
<Form.Group className="center-input">
  <Form.Label>Staking Amount</Form.Label>
  <Form.Control
    type="number"
    min="0"
    step="0.01"
    placeholder="Enter staking amount in UNCs"
    value={stakingAmount}
    onChange={(e) => setStakingAmount(e.target.value)}
  />
</Form.Group>


        <Button variant="primary" type="submit">
          Propose Project
        </Button>
      </Form>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Project Description</th>
            <th>Staked Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{proposal.projectDescription}</td>
              <td>{web3.utils.fromWei(proposal.stakedAmount, 'ether')} UNC</td>
              <td>{renderStatus(proposal)}</td>
            </tr>
          ))}
        </tbody>
        </Table>
    </Container>
  );
}
export default Projects;


