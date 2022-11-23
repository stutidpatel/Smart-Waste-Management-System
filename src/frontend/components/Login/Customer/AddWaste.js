import React from 'react';
import { useState } from 'react';
import './AddWaste.css';

const AddWaste = () => {
  const [wasteList, setWasteList] = useState([]);
  const [waste, setWaste] = useState('Select Waste');
  const NewWaste = () => {
    console.log('called');
    return (
      <div>
        <select waste={waste}>
          <option waste='plastic'>Plastic Waste</option>
          <option waste='steel'>Steel Waste</option>
          <option waste='biodegradable'>Biodegradable Waste</option>
          <option waste='ewaste'>E-Waste</option>
        </select>
        x
      </div>
    );
  };

  const addWaste = (e) => {
    setWasteList(wasteList.concat(<NewWaste />));
  };
  return (
    <div className='addWaste'>
      <p className='info'>
        Enter the approximate weight of waste you intend to give in the next
        collection drive.
      </p>
      <input className='weightInput' placeholder='Enter Weight in Kgs' />
      <button className='addWasteButton'>Add Waste</button>
      <span className='errorMessage'>
        The weight should only include numbers
      </span>
    </div>
  );
};

export default AddWaste;
