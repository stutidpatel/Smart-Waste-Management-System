import React from 'react';
import './CommitteeAccountStyle.css';

const CommitteeAccount = () => {
  const mockData = {
    name: 'Rahul Shah',
    id: '12',
    contactNumber: '+91 7548639585',
  };
  return (
    <div className='userBox'>
      <div className='innerBox'>
        <div className='row'>
          <div className='cell'>Name : </div>
          <div className='cell'>{mockData.name}</div>
        </div>
        <div className='row'>
          <div className='cell'>Id : </div>
          <div className='cell'>{mockData.id}</div>
        </div>
        <div className='row'>
          <div className='cell'>Contact Number : </div>
          <div className='cell'>{mockData.contactNumber}</div>
        </div>
        <button className='editButton'>Edit Details</button>
      </div>
    </div>
  );
};

export default CommitteeAccount;
