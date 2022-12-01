import React from 'react';
import { useState } from 'react';
import './AddWaste.css';
import { useLocation } from 'react-router-dom';
import extractErrorCode from '../../ErrorMessage';
import swal from 'sweetalert';

const AddWaste = ({ web3Handler, account, swms, provider }) => {
  const location = useLocation();
  localStorage.setItem('id', '');
  if (location.state && location.state.id) {
    localStorage.setItem('id', location.state.id);
  }

  const customerId = localStorage.getItem('id');
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
      // console.log(customerId);

      txn = await swms.addWaste(customerId, weight);
      console.log('Added Waste');

      provider.waitForTransaction(txn.hash).then(async function () {
        verify = await swms.customers(customerId);
        console.log(
          'Total weight to be collected: ',
          parseInt(verify.weight.toHexString(), 16)
        );

        // navigate('/student-home/company');
        // swal("Hurray", "Logged in Successfully", "success");
      });
    } catch (error) {
      let err = JSON.stringify(error);
      console.log(err);
      const errMsg = extractErrorCode(err);
      swal('Oops!', errMsg, 'error');
    }
  };
  const onChange = (e) => {
    console.log('w: ', e.target.value);
    setWeight(e.target.value);
    // setCustomer({e.target.value });
  };
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
      <span className='errorMessage'>
        The weight should only include numbers
      </span>
    </div>
  );
};

export default AddWaste;
