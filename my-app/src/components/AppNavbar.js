import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './AppNavbar.css';

const AppNavbar = ({ connectWallet, disconnectWallet, account }) => {
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState('Unknown');

  useEffect(() => {
    const fetchBalanceAndRole = async () => {
      // Remove the contract-related code since it's not being used in this component
    };

    fetchBalanceAndRole();
  }, [account]);

  return (
    <Navbar expand="lg" className="app-navbar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tasks">Tasks</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/badges">Badges</Nav.Link>
            <Nav.Link href="/staking">Staking</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/moonpay">MoonPay</Nav.Link>

          </Nav>
          <div>
            {account ? (
              <>
                <Navbar.Text className="ml-3">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </Navbar.Text>
                <Button className="disconnect-wallet-btn" onClick={disconnectWallet}>
                  Disconnect Wallet
                </Button>
              </>
            ) : (
              <Button className="connect-wallet-btn" onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;



