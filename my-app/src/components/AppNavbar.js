import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './AppNavbar.css';

const AppNavbar = ({ contract, account }) => {
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState('Unknown');

  useEffect(() => {
    const fetchBalanceAndRole = async () => {
      if (contract && account) {
        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);

        const isVolunteer = await contract.methods.isVolunteer(account).call();
        const isProjectManager = await contract.methods.isProjectManager(account).call();

        if (isVolunteer) {
          setRole('Volunteer');
        } else if (isProjectManager) {
          setRole('Project Manager');
        } else {
          setRole('Unknown');
        }
      }
    };

    fetchBalanceAndRole();
  }, [contract, account]);

  return (
    <Navbar expand="lg" className="app-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav> {/* Remove the ml-auto class */}
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/badges">Badges</Nav.Link>
          <Nav.Link href="/staking">Staking</Nav.Link> {/* Add this line for the Staking tab */}
        </Nav>
        {account && (
          <>
            <Navbar.Text className="ml-3">
              {account.slice(0, 6)}...{account.slice(-4)}
            </Navbar.Text>
            <Navbar.Text className="ml-3">
              UNicoin Balance: {balance}
            </Navbar.Text>
            <Navbar.Text className="ml-3">
              Role: {role}
            </Navbar.Text>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;




