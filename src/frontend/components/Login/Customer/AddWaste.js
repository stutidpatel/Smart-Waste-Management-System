import React, { useEffect } from 'react';
import { useState } from 'react';
import './AddWaste.css';
import extractErrorCode from '../../ErrorMessage';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';

const AddWaste = ({ account, swms, provider }) => {
  // const location = useLocation();
  // localStorage.setItem('id', '');
  // if (location.state && location.state.id) {
  //   localStorage.setItem('id', location.state.id);
  // }
  const navigate = useNavigate();
  const customerId = localStorage.getItem('id');
  console.log('In add wate', customerId);
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
    console.log('Calling committee');
    let txn, verify;

    try {
      txn = await swms.collectWaste(customerId);
      console.log('collected Waste', txn);

      provider.waitForTransaction(txn.hash).then(async function () {
        console.log('Decoded ', txn.decoded_output);
        console.log(txn.value);
        // swms.filters.AppointedMember()
        swms.on('AppointedMember', (memId, status, event) => {
          console.log(`${memId} status  ${status}`);
          extractErrorCode(status);
          // The event object contains the verbatim log data, the
          // EventFragment and functions to fetch the block,
          // transaction and receipt and event functions
        });
        console.log('Logs', txn.logs);
        verify = await swms.customers(customerId);
        console.log(
          'Total weight to be collected: ',
          parseInt(verify.curOrder.memberId.toHexString(), 16)
        );
      });
    } catch (error) {
      extractErrorCode(error);
    }
  };
  const findAppointedMember = async () => {
    let txn, verify;

    try {
      // txn = await swms.collectWaste(customerId);
      // console.log('collected Waste', txn);
      // provider.waitForTransaction(txn.hash).then(async function () {
      // console.log("Decoded ", txn.decoded_output);
      verify = await swms.customers(customerId);
      const memId = parseInt(verify.curOrder.memberId.toHexString(), 16);
      swal('Member', 'Appointed Member id ' + memId);
      // console.log('Member collecting hte waste: ',parseInt(verify.curOrder.memberId.toHexString(), 16));
    } catch (error) {
      extractErrorCode(error);
    }
  };
  const getCurrentWaste = async () => {
    console.log('cur weight');

    const verify = await swms.customers(customerId);
    const wt = parseInt(verify.curOrder.weight.toHexString(), 16);
    console.log('Total weight to be collected: ', wt);
    swal('Hurray!', 'Current waste collection is of ' + wt, 'success');
  };
  useEffect(() => {
    console.log(swms);
    if (!swms.interface) {
      swal('Session expired', '', 'warning');
      navigate('/login');
    }
  }, []);

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
      <button className='addWasteButton' onClick={findAppointedMember}>
        Member Appointed
      </button>
      <span className='errorMessage'>
        The weight should only include numbers
      </span>
    </div>
  );
};

export default AddWaste;
