import React, { useEffect } from 'react';
import { useState } from 'react';
import './AddWaste.css';
import extractErrorCode from '../../ErrorMessage';
import { Navigate, useLocation, useNavigate } from 'react-router';
import swal from 'sweetalert';


const AddWaste = ({ account, swms, provider }) => {
  // const location = useLocation();
  // localStorage.setItem('id', '');
  // if (location.state && location.state.id) {
  //   localStorage.setItem('id', location.state.id);
  // }
  const navigate = useNavigate();
  const customerId = localStorage.getItem('id');
  console.log("In add wate", customerId);
  const [wasteList, setWasteList] = useState([]);
  const [weight, setWeight] = useState(0);
  const [waste, setWaste] = useState('Select Waste');
  const NewWaste = () => {
    console.log('called');
    return (
      <div>
        <select waste={waste}>
          <option waste='plastic'>Plastic Waste</option>
          <option waste='steel'>Steel Waste</option>
          <option waste='biodegradable'>Biodegradable Waste</option>
          <option waste='ewaste'>E-Waste</option>
        </select>
      </div>
    );
  };

  const addWaste = (e) => {
    setWasteList(wasteList.concat(<NewWaste />));
  };
  const addWasteRequest = async () => {
    console.log('r:', weight);
    if (weight < 0) {
      swal('Oops!', 'Enter positive weight', 'error');
      return;
    }
    let txn, verify;

    try {
      console.log(swms);

      txn = await swms.addWaste(customerId, weight);
      console.log('Added Waste');

      provider.waitForTransaction(txn.hash).then(async function () {
        verify = await swms.customers(customerId);
        console.log(
          'Total weight to be collected: ',
          parseInt(verify.curOrder.weight.toHexString(), 16)
        );
      });
    } catch (error) {
      extractErrorCode(error);
    }
  };
  const onChange = (e) => {
    console.log('w: ', e.target.value);
    setWeight(e.target.value);
    // setCustomer({e.target.value });
  };
  const collectWaste = async () => {
    console.log("Calling committee");
    
  }
  const getCurrentWaste = async () => {
    console.log("cur weight");

    const verify = await swms.customers(customerId);
    const wt = parseInt(verify.curOrder.weight.toHexString(), 16);
    console.log('Total weight to be collected: ', wt);
    swal("Hurray!","Current waste collection is of "+ wt,"success")
  }
  useEffect(() => {
    console.log(swms);
    if (!swms.interface) {
      swal("Session expired", "", "warning");
      navigate("/login");
    }


  }, [])

  return (
    <div className='addWaste'>
      <p className='info'>
        Enter the approximate weight of waste you intend to give in the next
        collection drive. {typeof customerId}
      </p>
      <input
        className='weightInput'
        placeholder='Enter Weight in g'
        onChange={onChange}
      />
      <button className='addWasteButton' onClick={addWasteRequest}>
        Add Waste
      </button>
      <button className='addWasteButton' onClick={getCurrentWaste}>
        Current Waste
      </button>
      
      <button className='addWasteButton' onClick={collectWaste}>
        Call Committee member
      </button>
      <span className='errorMessage'>
        The weight should only include numbers
      </span>
    </div>
  );
};

export default AddWaste;
