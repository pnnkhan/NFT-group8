import React, { useEffect, useState } from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import myEpicGame from './utils/MyEpicGame.json';
import { ethers } from 'ethers';
import Arena from './Components/Arena';
import LoadingIndicator from './Components/LoadingIndicator';

const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
    /*
     * We release the state property after all the function logic
     */
    setIsLoading(false);
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    /*
     * If the app is currently loading, just render out LoadingIndicator
     */
    if (isLoading) {
      return <LoadingIndicator />;
    }
  
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
           <img     
            src="https://media0.giphy.com/media/nEMIrJyYlmiBd892jR/giphy.gif?cid=ecf05e47435u7spbtki2mtedyialtl08ak4t3kxh56wsg2pn&rid=giphy.gif&ct=g"
            alt="Monty Python Gif"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet To Get Started
          </button>
        </div>
      );
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      );
    }
};
  
  const checkNetwork = async () => {
  try { 
    if (window.ethereum.networkVersion !== '4') {
      alert("Please connect to Rinkeby!")
    }
  } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
    renderContent();
    checkNetwork();
  }, []);
  
  useEffect(() => {
  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicGame.abi,
      signer
    );

    const characterNFT = await gameContract.checkIfUserHasNFT();
    if (characterNFT.name) {
      console.log('User has character NFT');
      setCharacterNFT(transformCharacterData(characterNFT));
    }

    /*
     * Once we are done with all the fetching, set loading state to false
     */
    setIsLoading(false);
  };

  if (currentAccount) {
    console.log('CurrentAccount:', currentAccount);
    fetchNFTMetadata();
  }
}, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️Rescue the princess ⚔️</p>
          <p className="sub-text">Team up to defeat King Koopa!</p>
          {/* This is where our button and image code used to be!
           *	Remember we moved it into the render method.
           */}
          {renderContent()}
        </div>
        <div className="footer-container">
          Group 8 NFT GAME
        </div>
      </div>
    </div>
  );
};

export default App;