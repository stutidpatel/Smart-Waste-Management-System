import React from 'react';
import { useLocation } from 'react-router';
import './PendingTasksStyle.css';

const PendingTasks = () => {
  // const location = useLocation();
  // localStorage.setItem('id', '');
  // if (location.state && location.state.id) {
  //   localStorage.setItem('id', location.state.id);
  // }

  console.log('stored val ', localStorage.getItem('id'));
  const committeeId = localStorage.getItem('id');
  console.log("in pending taks c id", committeeId);
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

  return (
    <div>
      {mockData.map((task) => (
        <PendingCard {...task} key={task.id} />
      ))}
    </div>
  );
};

export default PendingTasks;

function PendingCard(props) {
  const { id, custAddress, custName, weightToBeCollected } = props;
  // console.log(id);
  return (
    <div className='pendingCard'>
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
          Amount in Kgs: <p>{weightToBeCollected}</p>
        </div>
      </div>
    </div>
  );
}
