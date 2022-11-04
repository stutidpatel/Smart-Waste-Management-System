import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

import Committee from './Registration/Committee';
import Login from './Login.js';
import Register from './Registration/Register.js';
import Customer from './Registration/Customer';
import Welcome from './Welcome.js';

import SWMSAddress from '../contractsData/SWMS-address.json'
import SWMSAbi from '../contractsData/SWMS.json'
import { ethers } from "ethers"

function App() {
  const [account, setAccount] = useState(null)
  const [swms, setSwms] = useState({})

  // loading contract
  const web3Handler = async () => {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    console.log("Acc= ", accounts[0]);
    console.log("Acc state= ", account);

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log("After provider");

    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
    console.log(account)
  }
  const loadContracts = async (signer) => {
    console.log("in load Contract")

    const swms1 = new ethers.Contract(SWMSAddress.address, SWMSAbi.abi, signer)
    setSwms(swms1);
    console.log("Loaded..", swms, account);
    // setLoading(false)
  }
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />}>
          <Route index element={<Customer web3Handler={web3Handler} account={account} swms={swms} />} />
          <Route path='customer' element={<Customer web3Handler={web3Handler} account={account} swms={swms} />} />
          <Route path='committee' element={<Committee />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
