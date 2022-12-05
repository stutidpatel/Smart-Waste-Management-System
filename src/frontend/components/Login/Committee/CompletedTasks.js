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
          const address = customerDetails.customerAddress.split("\n");

          pastOrders.push({
            id: order.customerId,
            custAddress: {
              firstLine: address[0],
              secondLine: address[1],
              thirdLine: '',
              pincode: '',
            },
            custName: customerDetails.name,
            weightCollected: parseInt(order.weight.toHexString(), 16),
            price: parseInt(order.price.toHexString(), 16) / 1e18 + " ETH",
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
        (pastOrders.length > 0) ?
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
          </div> : (
            < h2 style={{ textAlign: "center" }}>No completed Order </h2>

          )
      }
    </div>
  );
};

export default CompletedTasks;

function HistoryCard(props) {
  const { id, custAddress, custName, weightCollected, price } = props;
  console.log(id);
  return (
    <div className='completedCard'>
      <div className='id'>Customer Id : {parseInt(id.toHexString(),16)}</div>
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
          Amount in g: <p>{weightCollected}</p>
        </div>
        <div>
          Price: <p>{props.price}</p>
        </div>
      </div>
    </div>
  );
}
