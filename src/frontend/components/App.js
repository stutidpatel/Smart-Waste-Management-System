import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import swal from 'sweetalert';
import './App.css';

import Committee from './Registration/Committee';
import Login from './Login.js';
import Register from './Registration/Register.js';
import Customer from './Registration/Customer';
import Welcome from './Welcome.js';

import SWMSAddress from '../contractsData/SWMS-address.json';
import SWMSAbi from '../contractsData/SWMS.json';
import CustomerHome from './Login/Customer/CustomerHome';
import AddWaste from './Login/Customer/AddWaste';
import History from './Login/Customer/History';
import Account from './Login/Customer/Account';
import CommitteeHome from './Login/Committee/CommitteeHome';
import PendingTasks from './Login/Committee/PendingTasks';
import CompletedTasks from './Login/Committee/CompletedTasks';
import CommitteeAccount from './Login/Committee/CommitteeAccount';

function App() {
  const [account, setAccount] = useState(null);
  const [swms, setSwms] = useState({});
  const [provider, setProvider] = useState();
  // loading contract
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    console.log('Acc= ', accounts[0]);
    console.log('Acc state= ', account);

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('After provider');
    setProvider(provider);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      // window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
    console.log(account);
  };
  const loadContracts = async (signer) => {
    console.log('in load Contract');

    const swms1 = new ethers.Contract(SWMSAddress.address, SWMSAbi.abi, signer);
    setSwms(swms1);
    console.log('Loaded..', swms, account);
    swal('Successfully connected', '', 'success');
    // setLoading(false)
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />}>
          <Route
            index
            element={
              <Customer
                web3Handler={web3Handler}
                account={account}
                swms={swms}
                provider={provider}
              />
            }
          />
          <Route
            path='customer'
            element={
              <Customer
                web3Handler={web3Handler}
                account={account}
                swms={swms}
                provider={provider}
              />
            }
          />
          <Route path='committee' element={<Committee
            web3Handler={web3Handler}
            account={account}
            swms={swms}
            provider={provider} />} />
        </Route>
        <Route
          path='/login'
          element={
            <Login
              web3Handler={web3Handler}
              account={account}
              swms={swms}
              provider={provider}
            />
          }
        />
        <Route path='/customer-home' element={<CustomerHome
          web3Handler={web3Handler}
          account={account}
          swms={swms}
          provider={provider} />}
        >
          <Route index element={<AddWaste
            web3Handler={web3Handler}
            account={account}
            swms={swms}
            provider={provider}
            

          />} />
          <Route path='add-waste' element={<AddWaste
            web3Handler={web3Handler}
            account={account}
            swms={swms}
            provider={provider}
            
          />} />
          <Route path='history' element={<History
            web3Handler={web3Handler}
            account={account}
            swms={swms}
            provider={provider}
            
          />} />
          <Route path='account' element={<Account
            web3Handler={web3Handler}
            account={account}
            swms={swms}
            provider={provider}
            
          />} />
        </Route>
        <Route path='/committee-home' element={<CommitteeHome web3Handler={web3Handler}
          account={account}
          swms={swms}
          provider={provider} />}>
          <Route index element={<PendingTasks />} />
          <Route path='pending-tasks' element={<PendingTasks />} />
          <Route path='completed-tasks' element={<CompletedTasks />} />
          <Route path='account' element={<CommitteeAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
