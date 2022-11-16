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
        </select>x
      </div>
    );
  };

  const addWaste = (e) => {
    setWasteList(wasteList.concat(<NewWaste />));
  };
  return (
    <div>
      <input placeholder=''/>
    </div>
  );
};

export default AddWaste;
