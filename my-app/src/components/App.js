import { Web3Provider } from '../contexts/Web3Context';
import AppNavbar from './AppNavbar';
import Tasks from './Tasks';
import Task from './Task';
import Projects from './Projects';
import Staking from './Staking';
import ProposeProject from './ProposeProject';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Home from './Home';
import UNCollaborationABI from '../abis/UNCollaboration.json';
import UNBadgeABI from '../abis/UNBadge.json';
import './Styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UNCollaboration from '../abis/UNCollaboration.json';
import UNBadge from '../abis/UNBadge.json';
import Badges from "./Badges";
import './Navigation.css';
import Dashboard from './Dashboard';
import MoonPay from './MoonPay';

const UNCollaborationAddress = 'REPLACE_WITH_UNCOLLABORATION_CONTRACT_ADDRESS';
const UNBadgeAddress = 'REPLACE_WITH_UNBADGE_CONTRACT_ADDRESS';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [UNCollaborationContract, setUNCollaborationContract] = useState(null);
  const [UNBadgeContract, setUNBadgeContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [poapBadges, setPoapBadges] = useState([]);


  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContracts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const UNCollaboration = new web3.eth.Contract(UNCollaborationABI, UNCollaborationAddress);
        setUNCollaborationContract(UNCollaboration);

        const UNBadge = new web3.eth.Contract(UNBadgeABI, UNBadgeAddress);
        setUNBadgeContract(UNBadge);
      }
    };

    initContracts();
  }, [web3]);

  useEffect(() => {
    fetchPoapBadges();
  }, [UNBadgeContract]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      if (UNCollaborationContract) {
        const taskCount = await UNCollaborationContract.methods.getTaskCount().call();
        const fetchedTasks = [];

        for (let i = 0; i < taskCount; i++) {
          const task = await UNCollaborationContract.methods.tasks(i).call();
          fetchedTasks.push(task);
        }

        setTasks(fetchedTasks);
      }
    };

    fetchTasks();
  }, [UNCollaborationContract]);

  const addTask = async (taskDescription, reward, volunteer) => {
    if (UNCollaborationContract) {
      await UNCollaborationContract.methods
        .addTask(taskDescription, reward, volunteer)
        .send({ from: account });
    }
  };

  const completeTask = async (taskIndex) => {
    if (UNCollaborationContract) {
      await UNCollaborationContract.methods
        .completeTask(taskIndex)
        .send({ from: account });
    }
  };
  const fetchPoapBadges = async () => {
    if (UNBadgeContract) {
      const badgeCount = await UNBadgeContract.methods.getBadgeCount().call();
      const fetchedBadges = [];
  
      for (let i = 0; i < badgeCount; i++) {
        const badge = await UNBadgeContract.methods.badges(i).call();
        fetchedBadges.push(badge);
      }
  
      setPoapBadges(fetchedBadges);
    }
  };
  

  const awardBadge = async (volunteer, tokenId, badgeDescription, hoursContributed) => {
    if (UNBadgeContract) {
      await UNBadgeContract.methods
      .awardBadge(volunteer, tokenId, badgeDescription, hoursContributed)
      .send({ from: account });
      }
      };
      
      const [balance, setBalance] = useState(0);
      const [stakingPosition, setStakingPosition] = useState(0);
      
      const stakeTokens = async (amount) => {
      // Implement your staking functionality here
      };
      
      const unstakeTokens = async (amount) => {
      // Implement your unstaking functionality here
      };
      
      const connectWallet = async () => {
      if (window.ethereum) {
      try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      } catch (error) {
      console.log('Error connecting to wallet:', error);
      }
      } else {
      console.log('Please install MetaMask!');
      }
      };
      
      const disconnectWallet = () => {
      setAccount(null);
      };
      
      return (
      <Web3Provider
      value={{
      web3,
      account,
      contract: UNCollaborationContract,
      badgeContract: UNBadgeContract,
      addTask,
      completeTask,
      awardBadge,
      }}
      >
      <div className="App">
      <AppNavbar
             connectWallet={connectWallet}
             disconnectWallet={disconnectWallet}
             account={account}
           />
      <Routes>
      <Route
      path="/"
      element={
      <Home
                   web3={web3}
                   account={account}
                   UNCollaborationContract={UNCollaborationContract}
                   UNBadgeContract={UNBadgeContract}
                 />
      }
      />
      <Route path="/tasks" element={<Tasks />} />
      <Route
  path="/badges"
  element={
    <Badges
      provider={web3}
      volunteerAddress={account}
      badgeContract={UNBadgeContract}
      poapBadges={poapBadges}
    />
  }
/>

      <Route
      path="/task/:id"
      element={
      <Task
                   tasks={tasks}
                   completeTask={completeTask}
                 />
      }
      />
      <Route path="/projects" element={<Projects />} />
      <Route
      path="/staking"
      element={
      <Staking
                   stakeTokens={stakeTokens}
                   unstakeTokens={unstakeTokens}
                   balance={balance}
                   stakingPosition={stakingPosition}
                 />
      }
      />
      <Route path="/propose-project" element={<ProposeProject />} />
      <Route
      path="/badges"
      element={
      <Badges
                   provider={web3}
                   volunteerAddress={account}
                   badgeContract={UNBadgeContract}
                 />
      }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/moonpay" element={<MoonPay />} />
      </Routes>
      </div>
      </Web3Provider>
      );
    };
      
      export default App;
           


    



