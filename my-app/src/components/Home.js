import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import './Home.css';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants';
import homeImage from '../assets/homeImage.jpg';

const Home = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('');
  const [networkId, setNetworkId] = useState(0);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Get user's UNicoin balance
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const balance = await contract.methods.balanceOf(accounts[0]).call();
      setBalance(balance);
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  };


  const logout = () => {
    setAccount('');
  };

  useEffect(() => {
    // Get current network and network ID
    const getNetworkInfo = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const network = await web3.eth.net.getNetworkType();
        const networkId = await web3.eth.net.getId();
        setNetwork(network);
        setNetworkId(networkId);
      }
    };

    getNetworkInfo();
  }, []);
  useEffect(() => {
    // Refresh page on network change
    const handleNetworkChange = () => {
      window.location.reload();
    };
  
    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleNetworkChange);
    }
  
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleNetworkChange);
      }
    };
  }, []);
  

  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-color)' }}>
      </div>
      <Container>
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
      </Container>
      <footer className="mt-4 text-center">
        <p className="mb-0">
          UN Collaboration Platform © {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;

