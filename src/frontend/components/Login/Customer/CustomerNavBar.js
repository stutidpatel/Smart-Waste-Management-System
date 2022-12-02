import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomerNavBarStyles.css';

const CustomerNavBar = () => {
  return (
    <div className='body'>
      <nav className='nav'>
        <NavLink to='/' target={'_blank'}>
          Smart Waste Management System
        </NavLink>
        <ul>
          <li>
            <NavLink to='/customer-home/add-waste'>Add Waste</NavLink>
          </li>
          <li>
            <NavLink to='/customer-home/history'>History</NavLink>
          </li>
          <li>
            <NavLink to='/customer-home/account'>Account</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerNavBar;
