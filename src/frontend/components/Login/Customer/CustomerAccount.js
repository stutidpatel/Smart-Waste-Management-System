import React from 'react';
import './CustomerAccountStyle.css';
const CustomerAccount = () => {
  const mockData = {
    name: 'Taha Firoz',
    id: '12',
    addressLineOne: 'This is the address Line One',
    addressLineTwo: 'This is the address Line Two',
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
          <div className='cell'>Address Line One : </div>
          <div className='cell'>{mockData.addressLineOne}</div>
        </div>
        <div className='row'>
          <div className='cell'>Address Line Two : </div>
          <div className='cell'>{mockData.addressLineTwo}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
