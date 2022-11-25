import React from 'react';
import './CompletedTasksStyle.css';

const CompletedTasks = () => {
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
  return (
    <div>
      {mockData.map((task) => (
        <HistoryCard {...task} key={task.id} />
      ))}
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