import './PendingTasksStyle.css';
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import swal from 'sweetalert';
import extractErrorCode from '../../ErrorMessage';
import { utils } from 'ethers';
// import { ethers } from "ethers"

const PendingTasks = ({ swms, provider }) => {
  const memberId = localStorage.getItem('id');
  const [customerId, setCustomerId] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();
  console.log("in pending taks com id", memberId);
  const mockData = [
    {
      id: '01526',
      custAddress: {
        firstLine: 'C-405, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Taha Firoz Bharucha',
      weightToBeCollected: '5',
    },
    {
      id: '01852',
      custAddress: {
        firstLine: 'C-501, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Rahul Shah',
      weightToBeCollected: '7',
    },
    {
      id: '0741',
      custAddress: {
        firstLine: 'A-501, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Viren Patel',
      weightToBeCollected: '10',
    },
  ];
  const listPendingRequests = async () => {
    // setPendingRequests([]);
    let pendingData = [];
    const memberDetails = await swms.members(memberId);
    const customerId = parseInt(memberDetails.customerId.toHexString(), 16);

    console.log(customerId);
    setCustomerId(customerId);
    if (customerId == 0) {
      return 0;
    }
    const customerDetails = await swms.customers(customerId);
    const weight = parseInt(customerDetails.curOrder.weight.toHexString(), 16);
    console.log("Weight tot: ", weight, customerDetails.customerAddress);
    const address = customerDetails.customerAddress.split("\n");
    console.log("line 1", address[0], address[1]);
    pendingData.push({
      id: customerId,
      custAddress: {
        firstLine: address[0],
        secondLine: address[1],
        thirdLine: '',
        pincode: '',
      },
      custName: customerDetails.name,
      weightToBeCollected: parseInt(customerDetails.curOrder.weight.toHexString(), 16),
    })
    console.log("Pushed in pending data");
    setPendingRequests(pendingData);

    return 1;
  }
  const updateWasteIsCollected = async () => {
    let txn, price;
    try {
       txn = await swms.calcPrice(customerId);
      // txn = await swms.updateWasteCollected(memberId, customerId);
      // console.log('collected Waste', txn);
      provider.waitForTransaction(txn.hash).then(async function () {
        price = await swms.getCurOrderPrice(customerId);
        price = parseInt(price.toHexString(), 16)
        price /= 1e18;
        console.log("Price: ", price);
        txn = await swms.payCustomer(memberId, customerId, { value: utils.parseEther(price.toString()) });
        swal("Success", "Paid " + utils.formatEther(price), 'success');
        // verify = await swms.customers(customerId);

        // console.log("Customer ", verify.curOrder.memberId, verify.curOrder.weight, verify.curOrder.price);
        // const memId = parseInt(verify.curOrder.memberId.toHexString(), 16);
      });
      // swal("Member", "Appointed Member id " + memId);
      // console.log('Member collecting hte waste: ',parseInt(verify.curOrder.memberId.toHexString(), 16));
    } catch (error) {
      extractErrorCode(error);
    }
  }

  const [count, setCount] = useState(0);
  const temp = async () => {
    // console.log()
    const verify = await swms.getCurOrderPrice(customerId);
    console.log(parseInt(verify.toHexString(), 16)/1e18);

  }
  useEffect(() => {
    if (!swms.interface) {
      swal('Expired', '', 'warning');
      navigate('/login');
    }
    // if()
    // if (swms.interface) 
    setCount(listPendingRequests());
    console.log("count: ", count);

  }, []);
  // if (count == 0) {
  //   return (
  //     <h1 style={{ textAlign: "center" }}>No Requests</h1>
  //   )
  // } else { 

  return (
    <div>
      {
        // {count}
        (pendingRequests.length != 0) ?
          <div>
            {
              pendingRequests.map((task) => (
                <PendingCard {...task} key={task.id} />
              ))
            }
            {
            //   mockData.map((task) => (
            //     <PendingCard {...task} key={task.id} />
            // ))
            }
            <center>
            <button className='addWasteButton' onClick={updateWasteIsCollected}>
            Waste Collected
            </button>
            </center>
            <center>
            
            <button className= 'addWasteButton' onClick={temp}>Price</button>
            </center>
          </div>
          : (
            <h1 style={{ textAlign: "center" }}>No Requests</h1>

          )}    
    </div>
  )
}

export default PendingTasks;

function PendingCard(props) {
  const { id, custAddress, custName, weightToBeCollected } = props;
  // console.log(id);
  return (
    <div className='pendingCard'>
      <div className='id'>Customer Id : {id}</div>
      <div className='cardBody'>
        <div>
          Address :<p className='colDetails'>{custAddress.firstLine}</p>
          <p className='colDetails'>{custAddress.secondLine}</p>
          <p className='colDetails'>{custAddress.thirdLine}</p>
        </div>
        <div>
          Name of Customer :<p className='colDetails'>{custName}</p>
        </div>
        <div>
          Amount in grams: <p>{weightToBeCollected}</p>
        </div>
      </div>
    </div>
  );
}
