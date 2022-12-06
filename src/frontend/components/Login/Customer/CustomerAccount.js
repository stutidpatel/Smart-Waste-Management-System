import React from 'react';
import { useState,useEffect } from 'react';

import './CustomerAccountStyle.css';
const CustomerAccount = ({swms}) => {
  const mockData = {
    name: 'Taha Firoz',
    id: '12',
    addressLineOne: 'This is the address Line One',
    addressLineTwo: 'This is the address Line Two',
  };
  const id = localStorage.getItem('id');
  const [data, setData] = useState({});
  
  console.log(id);
  const loadDetails = async () => {
    const details = await swms.customers(id);
    const data = {};
    data.name = details.name;
    data.id = id;
    const add = details.customerAddress.split("\n");
    data.addressLineOne = add[0];
    data.addressLineTwo = add[1];
    console.log(data);
    setData(data);
  }
  useEffect(() => {
    loadDetails();


  }, [])

  return (
    <div className='customerBox'>
      <div className='innerBox'>
        <div className='row'>
          <div className='cell'>Name : </div>
          <div className='cell'>{data.name}</div>
          {
            // <div className='cell'>{mockData.name}</div>
          }
        </div>
        <div className='row'>
          <div className='cell'>Id : </div>
          <div className='cell'>{data.id}</div>
          {
            // <div className='cell'>{mockData.id}</div>
          }
        </div>
        <div className='row'>
          <div className='cell'>Address Line One : </div>
          <div className='cell'>{data.addressLineOne}</div>
          {
            // <div className='cell'>{mockData.addressLineOne}</div>
          }
        </div>
        <div className='row'>
          <div className='cell'>Address Line Two : </div>
          <div className='cell'>{data.addressLineTwo}</div>
          {
            // <div className='cell'>{mockData.addressLineTwo}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
