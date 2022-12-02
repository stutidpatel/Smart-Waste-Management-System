import React, { useState, useEffect } from 'react';
import './History.css';
import { Navigate, useLocation, useNavigate } from 'react-router';
import swal from 'sweetalert';
const mockData = [
  {
    id: '01526',
    dateCollected: '29/11/2022',
    timeCollected: '11:02 AM',
    collectedBy: {
      id: '123',
      name: 'Aarun Tapde',
    },
    amountCollected: {
      greenWaste: '1.2',
      steelWaste: '5.2',
      plasticWaste: '8.7',
      eWaste: '1.4',
      weight:1000
    },
  },
  {
    id: '85695',
    dateCollected: '15/09/2022',
    timeCollected: '09:25 AM',
    collectedBy: {
      id: '234',
      name: 'Rahul Mehta',

    },
    amountCollected: {
      greenWaste: '5.8',
      steelWaste: '7.9',
      plasticWaste: '8.1',
      eWaste: '0.5',
      weight: '1000'

    },
  },
];

const History = ({ account, swms, provider }) => {
  const customerId = localStorage.getItem('id');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pastRequests, setPastRequests] = useState([]);
  const navigate = useNavigate();
  const listCustomerDetails = async () => {
    let pendingData = [];
    const customerDetails = await swms.customers(customerId);
    const memberId = parseInt(customerDetails.curOrder.memberId.toHexString(), 16);
    const memberDetails = await swms.members(memberId);
    const weight = parseInt(customerDetails.curOrder.weight.toHexString(), 16);
    console.log("Weight tot: ",weight);
    pendingData.push({
      id: 'temp123',
      dateCollected: '29/11/2022',
      timeCollected: '11:02 AM',
      collectedBy: {
        id: memberId,
        name: memberDetails.name,
        
      },
      amountCollected: {
        greenWaste: '0',
        steelWaste: '0',
        plasticWaste: '0',
        eWaste: '0',
        weight:weight
        // weight: '1000'

      },

    })
    console.log(memberId);
    setPendingRequests(pendingData);


    // past requests todo
    // const pastRequests = await swms.pastOrders();
    // console.log("past requests");
  }
  useEffect(() => {
    if (!swms.interface ) {
      swal('Expired', '', 'warning');
      navigate('/login');
    }
    // if()
    listCustomerDetails();
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pending</h1>
      {pendingRequests.map((wasteCollected) => (
        // <div>{wasteCollected.id}</div>
        <HistoryCard props={wasteCollected} key={wasteCollected.id} />
      ))}
      <h1 style={{ textAlign: "center" }}>Collected</h1>
      {mockData.map((wasteCollected) => (
        // <div>{wasteCollected.id}</div>
        <HistoryCard props={wasteCollected} key={wasteCollected.id} />
      ))}
    </div>
  );
};

export default History;

function HistoryCard({ props }) {
  console.log(props);
  return (
    <div className='historyCard'>
      <div className='id'>Collection Id : {props.id}</div>
      <div className='cardBody'>
        <div>
          Collected By :
          <p className='colDetails'>Id : {props.collectedBy.id}</p>
          <p className='colDetails'>Name : {props.collectedBy.name}</p>
        </div>
        
          <div>
          Amount Collected In  Grams:{' '}
          <p>Green Waste : {props.amountCollected.greenWaste}</p>
          <p>E-Waste : {props.amountCollected.eWaste}</p>
          <p>Steel Waste : {props.amountCollected.steelWaste}</p>
          <p>Plastic Waste : {props.amountCollected.plasticWaste}</p>
          {
            <p>Total : {props.amountCollected.weight}</p>
          }
        </div>
        
        <div>Date Collected : {props.dateCollected}</div>
        <div>Time Collected : {props.timeCollected}</div>
      </div>
    </div>
  );
}
