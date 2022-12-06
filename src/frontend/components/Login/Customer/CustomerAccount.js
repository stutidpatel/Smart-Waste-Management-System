import React from 'react';
import './CustomerAccountStyle.css';
const CustomerAccount = () => {
  const mockData = {
    name: 'Taha Firoz',
    id: '12',
    address: 'This is the address',
  };
  return (
    <div className='customerBox'>
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
          <div className='cell'>Address : </div>
          <div className='cell'>{mockData.address}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
