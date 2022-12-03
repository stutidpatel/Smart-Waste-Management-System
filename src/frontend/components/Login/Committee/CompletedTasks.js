import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import extractErrorCode from '../../ErrorMessage';
import './CompletedTasksStyle.css';

const CompletedTasks = ({ swms, provider }) => {
  console.log('stroed val ', localStorage.getItem('id'));
  const memberId = localStorage.getItem('id');
  const [pastOrders, setPastOrders] = useState([]);
  const mockData = [
    {
      id: '85236',
      custAddress: {
        firstLine: 'C-702, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Stuti Patel',
      weightCollected: '12',
    },
    {
      id: '78542',
      custAddress: {
        firstLine: 'C-301, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Jainim Patel',
      weightCollected: '11',
    },
    {
      id: '96357',
      custAddress: {
        firstLine: 'A-201, Aavkar Avenue',
        secondLine: 'Uvarsad-Vavol Rd',
        thirdLine: 'Gandhinagar, Gujarat',
        pincode: '3822422',
      },
      custName: 'Kait Shah',
      weightToBeCollected: '15',
    },
  ];
  const listPastOrders = async () => {
    let order, verify, totalOrders, pastOrders = [];

    try {
      totalOrders = await swms.getPastOrderLength();
      console.log('tot past order', totalOrders);

      for (let index = 0; index < totalOrders; index++) {
        order = await swms.pastOrders(index);
        if (order.memberId == memberId) {
          let customerDetails = await swms.customers(order.customerId);
          pastOrders.push({
            id: 'temp',
            custAddress: {
              firstLine: customerDetails.customerAddress,
              secondLine: '',
              thirdLine: '',
              pincode: '',
            },
            custName: customerDetails.name,
            weightCollected: parseInt(order.weight.toHexString(), 16),
            
          })
        }
      console.log(order.weight);
      console.log(order.customerId);
      console.log(order.memberId);
      console.log(order.price);

    }
      // provider.waitForTransaction(order.hash).then(async function () {
      // console.log("Decoded ", order.decoded_output);
      // verify = await swms.customers(customerId);
      // console.log("Customer ", verify.curOrder.memberId, verify.curOrder.weight, verify.curOrder.price);
      // const memId = parseInt(verify.curOrder.memberId.toHexString(), 16);
      // });
    } catch (error) {
    extractErrorCode(error);
  }
  setPastOrders(pastOrders);
}
useEffect(() => {
  listPastOrders();

}, [])

  return (
    <div>
      {
        // mockData.map((task) => (
        // <HistoryCard {...task} key={task.id} />
        // ))
      }

      {
        pastOrders.map((task) => (
          <HistoryCard {...task} key={task.id} />
        ))
      }
    </div>
  );
};

export default CompletedTasks;

function HistoryCard(props) {
  const { id, custAddress, custName, weightCollected } = props;
  console.log(id);
  return (
    <div className='completedCard'>
      <div className='id'>Collection Id : {id}</div>
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
          Amount in Kgs: <p>{weightCollected}</p>
        </div>
      </div>
    </div>
  );
}
