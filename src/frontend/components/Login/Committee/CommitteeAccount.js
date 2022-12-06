import React,{useEffect} from 'react';
import { useState } from 'react';
import './CommitteeAccountStyle.css';

const CommitteeAccount = ({swms}) => {
  const mockData = {
    name: 'Rahul Shah',
    id: '12',
    contactNumber: '+91 7548639585',
  };
  const id = localStorage.getItem('id');
  const [data, setData] = useState({});
  // {
    // name: '',
    // id: '',
    // contactNumber: '',
  // }
  console.log(id);
  const loadDetails = async () => {
    const details = await swms.members(id);
    const data = {};
    data.name = details.name;
    data.id = id;
    data.contactNumber = parseInt(details.contactNumber.toHexString(),16);
    console.log(data);
    setData(data);
  }
  useEffect(() => {
    loadDetails();
  
   
  }, [])
  
  return (
    <div className='userBox'>
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
          <div className='cell'>Contact Number : </div>
          <div className='cell'>{data.contactNumber}</div>
          {
            // <div className='cell'>{mockData.contactNumber}</div>
          }
        </div>
        <button className='editButton'>Edit Details</button>
      </div>
    </div>
  );
};

export default CommitteeAccount;
