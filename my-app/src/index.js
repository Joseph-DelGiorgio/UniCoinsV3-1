import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Task from './components/Task';
import Projects from './components/Projects';
import Badges from './components/Badges';
import AppNavbar from './components/AppNavbar';
import Main from './components/Main';
import Staking from './components/Staking';
import Web3 from 'web3';
import ProposeProject from './components/ProposeProject'; // Add this line

const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000');


const AppWrapper = () => {
  const [account, setAccount] = useState(null);
  const [UNCollaborationContract, setUNCollaborationContract] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    fetchAccount();
  }, []);

  useEffect(() => {
    const loadContract = async () => {
      if (web3 && account) {
        const networkId = await web3.eth.net.getId();
        const contractData = UNCollaboration.networks[networkId];

        if (contractData) {
          const contractInstance = new web3.eth.Contract(UNCollaboration.abi, contractData.address);
          setUNCollaborationContract(contractInstance);
        } else {
          console.error("UNCollaborationContract not deployed to the detected network");
        }
      }
    };

    loadContract();
  }, [web3, account]);
  return (
    <App/>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppWrapper />
    </Router>
  </React.StrictMode>
);
