import React, { useState, useEffect } from 'react';
import './History.css';
import { Navigate, useLocation, useNavigate } from 'react-router';
import swal from 'sweetalert';
import extractErrorCode from '../../ErrorMessage';
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
  // const [pastRequests, setPastRequests] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const navigate = useNavigate();
  const listCustomerDetails = async () => {
    let pendingData = [];
    const customerDetails = await swms.customers(customerId);
    const memberId = parseInt(customerDetails.curOrder.memberId.toHexString(), 16);
    if (memberId != 0) {
      const memberDetails = await swms.members(memberId);
      const weight = parseInt(customerDetails.curOrder.weight.toHexString(), 16);
      console.log("Weight tot: ", weight);
      pendingData.push({
        id: memberId,
        // dateCollected: '29/11/2022',
        // timeCollected: '11:02 AM',
        collectedBy: {
          id: memberId,
          name: memberDetails.name,
        
        },
        amountCollected: {
          greenWaste: '0',
          steelWaste: '0',
          plasticWaste: '0',
          eWaste: '0',
          weight: weight
          // weight: '1000'

        },
        price: '0',
        
       

      })
    }
    console.log(memberId);
    setPendingRequests(pendingData);


    // past requests todo
    let order, verify, totalOrders, pastOrders = [];

    try {
      totalOrders = await swms.getPastOrderLength();
      console.log('tot past order', totalOrders);

      for (let index = 0; index < totalOrders; index++) {
        order = await swms.pastOrders(index);
        if (order.customerId == customerId) {
          let memberDetails = await swms.members(order.memberId);
          pastOrders.push({
            id: 'temp',
            // dateCollected: '',
            // timeCollected: '',
            collectedBy: {
              id: parseInt(order.memberId.toHexString(), 16),
              name: memberDetails.name,

            },
            amountCollected: {
              greenWaste: '0',
              steelWaste: '0',
              plasticWaste: '0',
              eWaste: '0',
              weight: parseInt(order.weight.toHexString(), 16)
              // weight: '1000'

            },
            price: parseInt(order.price.toHexString(), 16)/1e18 +" ETH",
            

          })
        }
        console.log(order.weight);
        console.log(order.customerId);
        console.log(order.memberId);
        console.log(order.price);

      }
    } catch (error) {
      extractErrorCode(error);
    }
    setPastOrders(pastOrders);
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
      <div>
        {
          (pendingRequests.length != 0) ?
            <div>
              {
                pendingRequests.map((wasteCollected) => (
                  // <div>{wasteCollected.id}</div>
                  <HistoryCard props={wasteCollected} key={wasteCollected.id} />
                ))
              }

            </div>
            : (
              <h3 style={{ textAlign: "center" }}>No Requests Pending</h3>

            )
        }
      </div>
      <h1 style={{ textAlign: "center" }}>Collected</h1>
      <div>
        {

          (pastOrders.length != 0) ?
            <div>
              {
                pastOrders.map((wasteCollected) => (
                  // <div>{wasteCollected.id}</div>   
                  <HistoryCard props={wasteCollected} key={wasteCollected.id} />
            ))
              }
              {
                // mockData.map((wasteCollected) => (
                // // <div>{wasteCollected.id}</div>
                // <HistoryCard props={wasteCollected} key={wasteCollected.id} />
                // ))
              }

            </div>
            : (
              <h2 style={{ textAlign: "center" }}>No completed Order </h2>
            )
        }
      </div>
    </div>
  );
};

export default History;

function HistoryCard({ props }) {
  console.log(props);
  return (
    <div className='historyCard'>
      <div className='id'>Committee Id : {props.id}</div>
      <div className='cardBody'>
        <div>
          Collected By :
          <p className='colDetails'>Id : {props.collectedBy.id}</p>
          <p className='colDetails'>Name : {props.collectedBy.name}</p>
        </div>
        
          <div>
          Amount Collected In  Grams:{' '}
          {
          // <p>Green Waste : {props.amountCollected.greenWaste}</p>
          // <p>E-Waste : {props.amountCollected.eWaste}</p>
          // <p>Steel Waste : {props.amountCollected.steelWaste}</p>
          // <p>Plastic Waste : {props.amountCollected.plasticWaste}</p>
          }
          {
            <p>Total : {props.amountCollected.weight}</p>
          }
        </div>
        {
          //<div>Date Collected : {props.dateCollected}</div>
        }
        <div>Price : {props.price}</div>
      </div>
    </div>
  );
}
