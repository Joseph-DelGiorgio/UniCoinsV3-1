import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import UNCollaborationABI from '../abis/UNCollaboration.json';
import UNBadgeABI from '../abis/UNBadge.json';

// Create Web3 context
export const Web3Context = createContext();

// Custom hook for easier access to the Web3 context
export function useWeb3() {
  return useContext(Web3Context);
}

// Web3Provider component for managing Web3 state and contracts
export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [badgeContract, setBadgeContract] = useState();

  // Initialize Web3
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
      } else {
        alert('Please install MetaMask to use this app.');
      }
    };
    initWeb3();
  }, []);

  // Load blockchain data
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!web3) return;

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      // Get network ID
      const networkId = await web3.eth.net.getId();

      // Load UNCollaboration contract
      const collaborationContractData = UNCollaborationABI.networks[networkId];
      if (collaborationContractData) {
        const contractInstance = new web3.eth.Contract(UNCollaborationABI.abi, collaborationContractData.address);
        setContract(contractInstance);
      } else {
        alert('UNCollaboration contract not deployed on the connected network.');
      }

      // Load UNBadge contract
      const badgeContractData = UNBadgeABI.networks[networkId];
      if (badgeContractData) {
        const badgeContractInstance = new web3.eth.Contract(UNBadgeABI.abi, badgeContractData.address);
        setBadgeContract(badgeContractInstance);
      } else {
        alert('UNBadge contract not deployed on the connected network.');
      }
    };

    loadBlockchainData();
  }, [web3]);

  // Prepare value for the Web3 context
  const value = {
    web3,
    account,
    contract,
    badgeContract,
  };

  // Provide the context value to children components
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

